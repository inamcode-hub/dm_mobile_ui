import styled from '@emotion/styled';

import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { signOut } from '../../features/user/userSlice';
import NavbarDesktop from './components/NavbarDesktop';
import NavbarMobile from './components/NavbarMobile';
import NavbarDrawer from './components/NavbarDrawer';
import { useWindowSize } from '../../hooks/useWindowSize';
import { getSystemStateValues } from '../../features/system/systemSlice';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { width, height } = useWindowSize();

  const handleLogout = () => {
    dispatch(signOut());
  };

  useEffect(() => {
    if (width > 768) {
      dispatch(
        getSystemStateValues({ name: 'isMobileNavbarOpen', value: false })
      );
    }
  }, [width, height]);

  return (
    <Wrapper>
      <div className='desktop'>
        <NavbarDesktop />
      </div>
      <div className='mobile'>
        <NavbarDrawer />
        <NavbarMobile />
      </div>
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .mobile {
    @media (min-width: 769px) {
      display: none;
    }
  }
  .desktop {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
export default DashboardLayout;
