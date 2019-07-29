import React from 'react';
import AdminSidebar from '../sidebar/Sidebar';
import Register from '../../user/Register';

export default () => (
  <div>
    <AdminSidebar />
    <div className="main">
      <Register />
    </div>
  </div>
);