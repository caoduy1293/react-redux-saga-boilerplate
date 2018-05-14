import React from 'react';
import {Layout} from "antd";
import propTypes from "prop-types";
import {Helmet} from "react-helmet";
import {compose} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect/es";

import injectReducer from "../../utils/injectReducer";
import injectSaga from "../../utils/injectSaga";
import {SELECTOR_ID_PAGE} from "./constants";
import reducer from './reducer';
import saga from './saga';
import {getListRoomsState} from "./selectors";
import {getListRooms} from "./actions";

class UserAppModule extends React.Component {
    componentWillMount() {
        this.props.getListRoomsFn();
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>User Management Page</title>
                    <meta name="description" content="A React.js Boilerplate application homepage"/>
                </Helmet>
                room app
            </div>
        );
    }
}

UserAppModule.propTypes = {
    // reducer state
    getListRoomsFn: propTypes.func,
    listRooms: propTypes.array,
};

export function mapDispatchToProps(dispatch) {
    return {
        getListRoomsFn: () => dispatch(getListRooms()),
    };
}

const mapStateToProps = createStructuredSelector({
    listRooms: getListRoomsState(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: SELECTOR_ID_PAGE, reducer });
const withSaga = injectSaga({ key: SELECTOR_ID_PAGE, saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(UserAppModule);
