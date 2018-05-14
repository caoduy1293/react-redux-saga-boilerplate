import React from 'react';
import propTypes from 'prop-types';
import {createStructuredSelector} from "reselect/es";
import BigCalendar from 'react-big-calendar';
import moment from "moment";
import {connect} from "react-redux";

import {Modal, Button, Row, Col, Spin, Select} from 'antd';

import {makeSelectLocale} from "../../../SharedComponent/LanguageProvider/selectors";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventBookingForm from "../EventBookingForm";
import {bookRooms, getBookedEvents} from "../actions";
import {
    getEventsBookingFormBookedEvents,
    getEventsBookingFormCreated, getEventsBookingFormLoading, getRoomSelectedState,
} from "../selectors";
import {FIELDS} from "../EventBookingForm/constants";

require('moment/locale/de');
require('moment/locale/en-gb');
require('moment/locale/vi');

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const { Option } = Select;

class CalendarComponent extends React.Component {
    state = { visible: false };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    formatEvents(events) {
        return events ? events.map((event) => {
            let start = moment(event.startDate).local().toDate();
            let end = moment(event.endDate).local().toDate();
            return {
                id: event._id,
                title: event.name,
                allDay: false,
                start,
                end,
            };
        }) : [];
    };
    renderListRooms = (rooms) => {
        let result = [];
        if (rooms && rooms.length > 0) {
            for(let i = 0, room; i < rooms.length; i++) {
                room = rooms[i];
                result.push(<Option key={room._id} value={room._id}>{room.name}</Option>);
            }
        }
        return result;
    };
    getBookedEvents = (objQueryEvent) => {
        console.log(objQueryEvent);
        this.props.getBookedEventsFn(objQueryEvent);
    };
    submitEventBooking = (values) => {
        let startTime = moment(values[FIELDS.startTime.id]);
        let endTime = moment(values[FIELDS.endTime.id]);
        let startDateTime = moment(values[FIELDS.startDate.id]);
        startDateTime.set('hour', startTime.get('hour'));
        startDateTime.set('minute', startTime.get('minute'));
        let endDateTime = moment(values[FIELDS.startDate.id]);
        endDateTime.set('hour', endTime.get('hour'));
        endDateTime.set('minute', endTime.get('minute'));
        let bookingData = {
            idRoom: values[FIELDS.idRoom.id],
            startDate: startDateTime,
            endDate: endDateTime,
            // endDate: endDateTime.format('YYYY-MM-DD HH:mm:ss'),
            name: values[FIELDS.eventName.id]
        };
        this.props.bookRoomsFn(bookingData);
    };
    refreshEvent = (idRoom) => {
        this.props.getEvents(idRoom);
    };
    render() {
        let events = this.props.events;
        events = this.formatEvents(events);
        let rooms = !!this.props.rooms ? this.props.rooms : [];
        let today = moment();
        today.hour(0);
        today.minute(0);
        today.second(0);
        return (
            <div className={'example'}>
                <div style={{marginBottom: 30}}>
                    <Row>
                        <Col xs={{ span: 24 }} md={{ span: 5, offset: 7 }}>
                            <Select placeholder="Room list" style={{ width: "70%" }} onChange={this.props.getEvents}>
                                {this.renderListRooms(this.props.rooms)}
                            </Select>
                            {this.props.selectedRoom ?
                                <Button onClick={() => {this.refreshEvent(this.props.selectedRoom)}}
                                        style={{marginLeft: '5px'}}
                                        shape="circle" icon="reload"
                                        loading={this.props.loading} /> : ''
                            }
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 5 }}>
                            <Button type="primary" onClick={this.showModal}>Book Meeting</Button>
                        </Col>
                    </Row>
                    <Modal
                        title="Booking Room"
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={null}
                    >
                        <Spin spinning={this.props.eventBookingLoading} >
                            <EventBookingForm
                                bookedEvents={this.props.eventBookingBookedEvents}
                                getBookedEvents={this.getBookedEvents}
                                onSubmit={this.submitEventBooking}
                                rooms={rooms} />
                        </Spin>
                    </Modal>
                </div>

                <BigCalendar
                    events={events}
                    views={allViews}
                    step={60}
                    culture={this.props.locale}
                    showMultiDayTimes
                    defaultDate={today.toDate()}
                />
            </div>
        );
    }
}
CalendarComponent.propTypes = {
    locale: propTypes.string,
    selectedRoom: propTypes.string,
    loading: propTypes.bool,
    rooms: propTypes.array,
    events: propTypes.array,
    eventBookingLoading: propTypes.bool,
    eventBookingCreated: propTypes.any,
    eventBookingBookedEvents: propTypes.any,

    getEvents: propTypes.func,
    bookRoomsFn: propTypes.func,
    getBookedEventsFn: propTypes.func,
};

const mapStateToProps = createStructuredSelector({
    locale: makeSelectLocale(),
    eventBookingLoading: getEventsBookingFormLoading(),
    eventBookingCreated: getEventsBookingFormCreated(),
    eventBookingBookedEvents: getEventsBookingFormBookedEvents(),
    selectedRoom: getRoomSelectedState(),
});

export function mapDispatchToProps(dispatch) {
    return {
        bookRoomsFn: (objEventBooking) => dispatch(bookRooms(objEventBooking)),
        getBookedEventsFn: (objQueryEvent) => dispatch(getBookedEvents(objQueryEvent)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent);