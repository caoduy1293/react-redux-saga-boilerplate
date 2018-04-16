import React from 'react';
import propTypes from 'prop-types';
import {createStructuredSelector} from "reselect/es";
import BigCalendar from 'react-big-calendar';
import moment from "moment";
import {connect} from "react-redux";

import {Modal, Button, Row, Col} from 'antd';

import {makeSelectLocale} from "../../../SharedComponent/LanguageProvider/selectors";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import SelectOption from "../../../../components/SelectOption";

require('moment/locale/de');
require('moment/locale/en-gb');
require('moment/locale/vi');

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

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
            return {
                id: event._id,
                title: event.name,
                allDay: false,
                start: new Date(event.startDate),
                end: new Date(event.endDate),
            };
        }) : [];
    }
    render() {
        let events = this.props.events;
        events = this.formatEvents(events);
        return (
            <div className={'example'}>
                <div>
                    <Row>
                        <Col xs={{ span: 8 }}>
                            <SelectOption defaultLabel={'Room list'} values={this.props.rooms} onToggle={this.props.getEvents}></SelectOption>
                        </Col>
                        <Col xs={{ span: 8 }} />
                        <Col xs={{ span: 8 }}><Button type="primary" onClick={this.showModal}>Book Meeting</Button></Col>
                    </Row>
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </div>
                <BigCalendar
                    events={events}
                    views={allViews}
                    step={60}
                    culture={this.props.locale}
                    showMultiDayTimes
                    defaultDate={new Date(2018, 3, 1)}
                />
            </div>
        );
    }
}
CalendarComponent.propTypes = {
    locale: propTypes.string,
    rooms: propTypes.array,
    events: propTypes.array,
    getEvents: propTypes.func,
};

const mapStateToProps = createStructuredSelector({
    locale: makeSelectLocale(),
});

export default connect(mapStateToProps)(CalendarComponent);