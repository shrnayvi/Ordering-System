import React from 'react';
import { FormattedMessage } from 'react-intl';

import Sidebar from '../Sidebar';

export default () => (
  <React.Fragment>
    <Sidebar />
    <div className="main">
      <h1>
        <FormattedMessage id="add_category" />
      </h1>
    </div>
  </React.Fragment>
)