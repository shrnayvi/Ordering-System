import React from 'react';

import Sidebar from './Sidebar';
import Profile from '../common/Profile';

export default () => (
  <React.Fragment>
    <Sidebar />
    <div className="main">
      <Profile />
    </div>
  </React.Fragment>
)