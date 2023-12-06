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
import ToggleTheme from '../../../components/ToggleTheme';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  anchorEl: null,
};
const NavbarMobile = () => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(initialState);
  const { anchorEl, firstName, lastName, email } = state;

  const handleMenu = (event) => {
    const firstName = Cookies.get('dryermaster_firstName');
    const lastName = Cookies.get('dryermaster_lastName');
    const email = Cookies.get('dryermaster_email');
    setState({
      ...state,
      anchorEl: event.currentTarget,
      firstName,
      lastName,
      email,
    });
  };

  const handleClose = () => {
    setState({ ...state, anchorEl: null });
  };
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
          <div>
            <IconButton
              size='large'
              aria-label='alert'
              onClick={() => console.log('alert')}
              color='inherit'>
              <FaBell size={28} />
            </IconButton>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'>
              <AccountCircle fontSize='large' />
            </IconButton>
            <ToggleTheme />
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <NameEmail>
                <p>
                  <span>{firstName}</span>
                  <span>{lastName}</span>
                </p>
                <p>{email}</p>
              </NameEmail>
              <Divider />
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Inbox</MenuItem>
              <Divider />
              <MenuItem
                onClick={() => dispatch(signOut())}
                className='logout'
                sx={{
                  // color if theme mode is dark only than red
                  color: (theme) =>
                    theme.palette.mode !== 'dark' ? 'red' : 'inherit',
                }}>
                Logout
              </MenuItem>
            </Menu>
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
`;

const NameEmail = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
    padding: 0rem 16px;
  }
  p:first-of-type {
    display: flex;

    align-items: center;
    gap: 0.5rem;
    span {
      font-weight: 500;
      text-transform: capitalize;
    }
  }
  //last child
  p:last-child {
    margin-top: 0rem;
    color: #808080;
  }
`;
export default NavbarMobile;
