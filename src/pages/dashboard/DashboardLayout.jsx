import styled from '@emotion/styled';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <Wrapper>
      <ul>
        <li>
          <Link to={'/dashboard'}>home</Link>
          <Link to={'/dashboard/settings'}>settings</Link>
          <Link to={'/dashboard/history'}>history</Link>
        </li>
      </ul>
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* background-color: pink; */
`;
export default DashboardLayout;
