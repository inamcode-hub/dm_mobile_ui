import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={'/dashboard'}>home</Link>
          <Link to={'/dashboard/settings'}>settings</Link>
          <Link to={'/dashboard/history'}>history</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
