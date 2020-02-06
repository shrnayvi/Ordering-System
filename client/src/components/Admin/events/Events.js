import React from 'react';

import Sidebar from '../Sidebar';

export default _ => {
  return (
    <React.Fragment>
      <Sidebar />
      <div className="main">
        <h1>Events</h1>
      </div>
    </React.Fragment>
  )
}