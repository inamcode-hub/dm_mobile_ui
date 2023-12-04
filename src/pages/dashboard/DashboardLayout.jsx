import styled from '@emotion/styled';

import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { signOut } from '../../features/user/userSlice';

const DashboardLayout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  };
  return (
    <Wrapper>
      <ul>
        <li>
          <Link to={'/dashboard'}>home</Link>
          <Link to={'/dashboard/settings'}>settings</Link>
          <Link to={'/dashboard/history'}>history</Link>
        </li>
        <Button
          variant='contained'
          onClick={handleLogout}>
          Click me
        </Button>
      </ul>
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* background-color: pink; */
`;
export default DashboardLayout;
