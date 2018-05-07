import React from "react";
import propTypes from "prop-types";
import { reduxForm, Field } from "redux-form/immutable";
import {Form, Select, Button, DatePicker, TimePicker, Input} from "antd";
import {connect} from "react-redux";

import {EVENT_BOOKING_FORM_ID} from "../constants";
import {FIELDS, tailFormItemLayout} from "./constants";
import FormFieldForInput from "../../../../components/FormField/Input";
import FormFieldForDatePicker from "../../../../components/FormField/DatePicker";
import FormFieldForTimePicker from "../../../../components/FormField/TimePicker";
import {EndTimeType, StartTimeType} from "../../../../components/constants";
import {selectorEventBookingForm} from "./selectorEventBookingForm";
import moment from "moment";

const FormItem = Form.Item;
const { Option } = Select;

const AInput = FormFieldForInput(Input);
const ASelect = FormFieldForInput(Select);
const ADatePicker = FormFieldForDatePicker(DatePicker);
const ATimePicker = FormFieldForTimePicker(TimePicker);

class EventBookingForm extends React.Component{
    render () {
        const {
            startDate,
            startTime,
            endTime,
            handleSubmit,
            pristine,
            reset,
            submitting,
        } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <Field
                    label={FIELDS.eventName.label}
                    name={FIELDS.eventName.id}
                    component={AInput}
                    placeholder={FIELDS.eventName.label}
                    hasFeedback/>

                <Field label={FIELDS.idRoom.label}
                       name={FIELDS.idRoom.id}
                       component={ASelect}
                       placeholder={FIELDS.eventName.label}
                       hasFeedback>
                    {this.props.rooms.map((value) => (<Option key={value._id} value={value._id}>{value.name}</Option>))}
                </Field>

                <Field label={FIELDS.startDate.label}
                       name={FIELDS.startDate.id}
                       component={ADatePicker}
                       placeholder={FIELDS.startDate.label}
                       valueDate={startDate}
                       hasFeedback>
                </Field>

                <FormItem label={'Time Booked'}>
                    <div>
                        Time Booked
                    </div>
                </FormItem>

                <Field label={FIELDS.startTime.label}
                       name={FIELDS.startTime.id}
                       component={ATimePicker}
                       placeholder={FIELDS.startTime.label}
                       valueDate={startTime}
                       startDate={startDate}
                       typeTime={StartTimeType}
                       hasFeedback>
                </Field>

                <Field label={FIELDS.endTime.label}
                       name={FIELDS.endTime.id}
                       component={ATimePicker}
                       placeholder={FIELDS.endTime.label}
                       valueDate={endTime}
                       startTime={startTime}
                       startDate={startDate}
                       typeTime={EndTimeType}
                       hasFeedback>
                </Field>

                <FormItem {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        disabled={pristine || submitting}
                        htmlType="submit"
                        style={{ marginRight: "10px" }}>
                        Submit
                    </Button>
                    <Button disabled={pristine || submitting} onClick={reset}>
                        Clear Values
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

EventBookingForm.propTypes = {
    rooms: propTypes.array,
    loading: propTypes.bool,
    eventName: propTypes.any,
    idRoom: propTypes.any,
    startDate: propTypes.any,
    startTime: propTypes.any,
    endTime: propTypes.any,
};

const validate = values => {
    const errors = {};
    if (!values[FIELDS.eventName.id]) {
        errors[FIELDS.eventName.id] = 'Required'
    }
    if (!values[FIELDS.idRoom.id]) {
        errors[FIELDS.idRoom.id] = 'Required'
    }
    if (!values[FIELDS.startDate.id]) {
        errors[FIELDS.startDate.id] = 'Required'
    }
    if (!values[FIELDS.startTime.id]) {
        errors[FIELDS.startTime.id] = 'Required'
    }
    if (!values[FIELDS.endTime.id]) {
        errors[FIELDS.endTime.id] = 'Required'
    }
    if(values[FIELDS.startDate.id] && values[FIELDS.startTime.id] && values[FIELDS.endTime.id]) {
        let currentDateStr = moment().format('YYYY-MM-DD');
        let startDateStr = moment(values[FIELDS.startDate.id]).format('YYYY-MM-DD');
        let currentDate = moment();
        let startTime = moment(values[FIELDS.startTime.id]);
        let endTime = moment(values[FIELDS.endTime.id]);
        if(currentDateStr === startDateStr && (!currentDate.isBefore(startTime) || !currentDate.isBefore(endTime)) ) {
            errors[FIELDS.startTime.id] = 'Invalid time !';
            errors[FIELDS.endTime.id] = 'Invalid time !';
        }
        if(!startTime.isBefore(endTime)) {
            errors[FIELDS.endTime.id] = 'Invalid time !';
        }
    }
    return errors;
};

EventBookingForm = reduxForm({
    form: EVENT_BOOKING_FORM_ID,
    validate
})(EventBookingForm);

EventBookingForm = connect(state => {
    const { eventName, idRoom } = selectorEventBookingForm(state, FIELDS.eventName.id, FIELDS.idRoom.id);
    const startDate = selectorEventBookingForm(state, FIELDS.startDate.id);
    const startTime = selectorEventBookingForm(state, FIELDS.startTime.id);
    const endTime = selectorEventBookingForm(state, FIELDS.endTime.id);
    return {
        eventName,
        idRoom,
        startDate,
        startTime,
        endTime,
    };
})(EventBookingForm);

export default EventBookingForm;
