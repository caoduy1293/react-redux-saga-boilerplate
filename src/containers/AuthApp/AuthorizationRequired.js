import React from 'react';
import propTypes from 'prop-types';
import { createStructuredSelector } from 'reselect/es';
import { connect } from 'react-redux';
import {authenticateUser} from "../AppRoot/actions";
import {getAuthenticatedUser} from "../AppRoot/selectors";

export default function (ComposedComponent) {
    class Authentication extends React.Component {
        static contextTypes = {
            router: propTypes.object,
        };

        componentWillMount() {
            console.log(this.props.authenticatedUser);
            if (!this.props.authenticatedUser) {
                this.context.router.history.push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticatedUser) {
                this.context.router.history.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }
    Authentication.propTypes = {
        authenticatedUser: propTypes.object,
    };

    function mapDispatchToProps(dispatch) {
        return {
            authFn: () => dispatch(authenticateUser()),
        };
    }

    const mapStateToProps = createStructuredSelector({
        authenticatedUser: getAuthenticatedUser(),
    });

    return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}
