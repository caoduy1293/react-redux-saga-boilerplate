import React from 'react';
import {Layout} from "antd";
import propTypes from "prop-types";
import {Helmet} from "react-helmet";
import {compose} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect/es";

import AppLayoutWrapper from "../../SharedComponent/AppLayoutWrapper";
import CalendarComponent from "./calendarComponent";
import injectReducer from "../../../utils/injectReducer";
import injectSaga from "../../../utils/injectSaga";
import {SELECTOR_ID_PAGE} from "./constants";
import {getEvents, getRooms} from "./actions";
import {getErrorState, getEventsState, getLoadingState, getMessageState, getRoomsState} from "./selectors";
import reducer from './reducer';
import saga from './saga';

class DashboardContainer extends React.Component {
    componentWillMount() {
        this.props.getRoomsFn();
    }

    render() {
        return (
            <Layout>
                <Helmet>
                    <title>Dashboard Page</title>
                    <meta name="description" content="A React.js Boilerplate application homepage"/>
                </Helmet>
                <AppLayoutWrapper>
                    <CalendarComponent events={this.props.events} getEvents={this.props.getEventsFn} rooms={this.props.rooms}/>
                </AppLayoutWrapper>
            </Layout>
        );
    }
}

DashboardContainer.propTypes = {
    rooms: propTypes.array,
    events: propTypes.array,
    loading: propTypes.bool,
    error: propTypes.bool,
    messages: propTypes.string,
    getRoomsFn: propTypes.func,
    getEventsFn: propTypes.func,
};

export function mapDispatchToProps(dispatch) {
    return {
        getRoomsFn: () => dispatch(getRooms()),
        getEventsFn: (idRoom) => dispatch(getEvents(idRoom)),
    };
}

const mapStateToProps = createStructuredSelector({
    rooms: getRoomsState(),
    events: getEventsState(),
    loading: getLoadingState(),
    error: getErrorState(),
    messages: getMessageState(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: SELECTOR_ID_PAGE, reducer });
const withSaga = injectSaga({ key: SELECTOR_ID_PAGE, saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(DashboardContainer);
