/**
 *
 * LocaleToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';
const { Option } = Select;

function SelectOption(props) {
    let result;
    let content;

    // If we have items, render them
    if (props.values) {
        content = props.values.map((value) => (
            <Option key={value._id} value={value._id}>{value.name}</Option>
        ));
        result = (
            <Select defaultValue={'disabled'} style={{ width: 200 }} onChange={props.onToggle}>
                <Option key={'noValue'} value="disabled" disabled>{props.defaultLabel || 'Select Options'}</Option>
                {content}
            </Select>
        );
    }

    result = props.values ? result : '';

    return result;
}

SelectOption.propTypes = {
    onToggle: PropTypes.func,
    defaultLabel: PropTypes.string,
    values: PropTypes.array,
};

export default SelectOption;
