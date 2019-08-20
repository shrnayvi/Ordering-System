import React from 'react';
import Sidebar from './customer/sidebar/Sidebar';

const Home = (props) => {
  return (
    <div>
      <Sidebar />
      <div className="main">
        <h1>Welcome to Ordering System</h1>
      </div>
    </div>
  )
}

export default Home;