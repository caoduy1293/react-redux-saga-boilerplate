/**
*
* LocaleToggle
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Select } from 'antd';
const { Option } = Select;

function Toggle(props) {
  let content = (<Option>--</Option>);

  // If we have items, render them
  if (props.values) {
    content = props.values.map((value) => (
        <Option key={value} value={value}>{props.messages ? <FormattedMessage {...props.messages[value]} /> : value}</Option>
    ));
  }

  return (
    <Select style={{ width: 100 }} value={props.value} onChange={props.onToggle}>
      {content}
    </Select>
  );
}

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
