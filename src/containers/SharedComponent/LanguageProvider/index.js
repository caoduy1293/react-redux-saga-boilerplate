/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';
import {createStructuredSelector} from "reselect/es";

class LanguageProvider extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <IntlProvider locale={this.props.locale} key={this.props.locale} messages={this.props.messages[this.props.locale]}>
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: propTypes.string,
  messages: propTypes.object,
  children: propTypes.element.isRequired,
};

const mapStateToProps = createStructuredSelector({
    locale: makeSelectLocale(),
});

export default connect(mapStateToProps)(LanguageProvider);
