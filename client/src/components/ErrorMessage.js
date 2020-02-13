import React from 'react';
import { FormattedMessage } from 'react-intl';

export default ({ message }) => (
  <span className="odr-error-msg">
    <FormattedMessage id={message} />
  </span>
);