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
            <Select placeholder={props.defaultLabel || 'Select Options'} style={{ width: 200 }} onChange={props.onToggle}>
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
