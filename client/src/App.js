import React from 'react';
import { IntlProvider } from 'react-intl';

import Routes from './Routes';
import EN_Locale from './locales/en';

export default () => {
  return (
    <IntlProvider locale="en" messages={EN_Locale} >
      <Routes />
    </IntlProvider>
  );
}