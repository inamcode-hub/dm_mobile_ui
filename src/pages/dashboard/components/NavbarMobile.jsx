import styled from '@emotion/styled';
import {
  AppBar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { FaBell } from 'react-icons/fa6';

import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';
import { signOut } from '../../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { getSystemStateValues } from '../../../features/system/systemSlice';
import UserCard from './subcomponents/UserCard';

const NavbarMobile = () => {
  const dispatch = useDispatch();

  const handleNavbar = () => {
    dispatch(getSystemStateValues({ name: 'isMobileNavbarOpen', value: true }));
  };
  return (
    <Wrapper>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={handleNavbar}>
            <MenuIcon fontSize='large' />
          </IconButton>

          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}>
            Dryer Master
          </Typography>
          <div className='icons'>
            <IconButton
              size='large'
              aria-label='alert'
              onClick={() => console.log('alert')}
              color='inherit'>
              <FaBell size={28} />
            </IconButton>
            <UserCard />
          </div>
        </Toolbar>
      </AppBar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  height: 3.5rem;
  @media (min-width: 600px) {
    height: 4rem;
  }
  z-index: 100;
  width: 100%;

  .menu-logo,
  .profile {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .icons {
    display: flex;
    align-items: center;
  }
`;

export default NavbarMobile;
