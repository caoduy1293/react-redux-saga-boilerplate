import React from 'react';
import propTypes from 'prop-types';
import { createStructuredSelector } from 'reselect/es';
import { connect } from 'react-redux';
import {authenticateUser} from "../AppRoot/actions";
import {getAuthenticatedUser} from "../AppRoot/selectors";
import {LOCAL_STORAGE_ID_KEY, ROUTE_TREE} from "../AppRoot/constants";
import * as jwt_decode from 'jwt-decode';
import moment from 'moment';

export default function (ComposedComponent) {
    class Authentication extends React.Component {
        static contextTypes = {
            router: propTypes.object,
        };

        componentWillMount() {
            let token  = localStorage.getItem(LOCAL_STORAGE_ID_KEY.token);
            if(token) {
                try {
                    let decodedToken = jwt_decode(token);
                    let expTime = decodedToken.exp;
                    let currentTime = moment().unix();
                    if(expTime < currentTime) {
                        this.context.router.history.push('/' + ROUTE_TREE.login);
                    }
                } catch (error) {
                    console.log(error);
                    this.context.router.history.push('/' + ROUTE_TREE.login);
                }
            } else {
                this.context.router.history.push('/' + ROUTE_TREE.login);
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
        authFn: propTypes.func,
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
