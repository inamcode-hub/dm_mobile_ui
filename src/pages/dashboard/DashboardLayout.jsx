import styled from '@emotion/styled';

import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { signOut } from '../../features/user/userSlice';
import NavbarDesktop from './components/NavbarDesktop';
import NavbarMobile from './components/NavbarMobile';
import NavbarDrawer from './components/NavbarDrawer';

const DashboardLayout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  };
  return (
    <Wrapper>
      <NavbarDrawer />
      <NavbarDesktop />
      <NavbarMobile />
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default DashboardLayout;
