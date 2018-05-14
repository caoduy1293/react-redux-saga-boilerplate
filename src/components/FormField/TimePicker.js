import React from "react";
import {Form} from "antd";
import {EndTimeType, formItemLayout} from "../constants";
import moment from "moment";
const FormItem = Form.Item;

const FormFieldForTimePicker = Component => ({input, meta, children, hasFeedback, label, valueDate, startDate, startTime, typeTime, ...rest}) => {
    const hasError = meta.touched && meta.invalid;
    const startTimeTemp = !!startTime ? startTime : null;
    const startDateTemp = !!startDate ? startDate : null;
    const disabledHoursBaseOneSelectedDate = (selectedDate, id, startTime = '') => {
        let disabledTime = [];
        let currentDate = moment().format('DD-MM-YYYY');
        if(!!selectedDate && currentDate === selectedDate.format('DD-MM-YYYY')) {
            let currentHour = moment().hour();
            for(let i = 0; i <= currentHour; i++) {
                disabledTime.push(i);
            }
        }
        if(id === EndTimeType && !!startTime) {
            let startTimeHours = moment(startTime).hour();
            let listTemp = [];
            for(let i = 0; i < startTimeHours; i++) {
                listTemp.push(i);
            }
            disabledTime = listTemp;
        }
        return disabledTime;
    };

    return (
        <FormItem
            {...formItemLayout}
            label={label}
            validateStatus={hasError ? "error" : "success"}
            hasFeedback={hasFeedback && hasError}
            help={hasError && meta.error}
        >
            <Component onChange={(date) => {input.onChange(date)}}
                       disabledHours={() => disabledHoursBaseOneSelectedDate(startDateTemp, typeTime, startTimeTemp)}
                       minuteStep={15}
                       defaultOpenValue={moment('08:00', 'HH:mm')}
                       format={'HH:mm'}
                       hideDisabledOptions={true}
                       value={!!valueDate ? valueDate : null} />
        </FormItem>
    );
};

export default FormFieldForTimePicker;

