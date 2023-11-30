import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ToggleTheme from '../../components/ToggleTheme';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  showPassword: false,
  firstNameError: false,
  lastNameError: false,
  emailError: false,
  passwordError: false,
};
const Register = () => {
  const [state, setState] = useState(initialState);
  const {
    firstName,
    lastName,
    email,
    password,
    firstNameError,
    lastNameError,
    emailError,
    passwordError,
    showPassword,
  } = state;

  const handleShowPassword = () => {
    setState({ ...state, showPassword: !showPassword });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate first name
    if (!firstName) {
      setState((prevState) => ({ ...prevState, firstNameError: true }));
    } else {
      setState((prevState) => ({ ...prevState, firstNameError: false }));
    }

    // Validate last name
    if (!lastName) {
      setState((prevState) => ({ ...prevState, lastNameError: true }));
    } else {
      setState((prevState) => ({ ...prevState, lastNameError: false }));
    }

    // Validate email
    if (!email) {
      setState((prevState) => ({ ...prevState, emailError: true }));
    } else {
      setState((prevState) => ({ ...prevState, emailError: false }));
    }

    // Validate password
    if (!password) {
      setState((prevState) => ({ ...prevState, passwordError: true }));
    } else {
      setState((prevState) => ({ ...prevState, passwordError: false }));
    }

    // If both email and password are valid, proceed with form submission
    if (!emailError && !passwordError && !firstNameError && !lastNameError) {
      console.log('Submit form');
    }
  };

  return (
    <Wrapper>
      <Container>
        <Heading>
          <Typography
            variant='h4'
            className='heading-title'>
            Get started with DryerMaster
          </Typography>
          <HeadingBody>
            <Typography
              variant='body2'
              className='new-user'>
              Already have an account?
            </Typography>
            <Link to='/'>
              <Typography
                variant='body2'
                sx={{ fontWeight: 500 }}>
                Sign in
              </Typography>
            </Link>
          </HeadingBody>
        </Heading>
        <form onSubmit={handleSubmit}>
          <Body>
            <div className='name'>
              <TextField
                fullWidth
                label='First name'
                variant='outlined'
                value={firstName}
                onChange={(e) =>
                  setState({ ...state, firstName: e.target.value })
                }
                error={firstNameError}
                helperText={firstNameError && 'First name is required'}
              />
              <TextField
                fullWidth
                label='Last name'
                variant='outlined'
                value={lastName}
                onChange={(e) =>
                  setState({ ...state, lastName: e.target.value })
                }
                error={lastNameError}
                helperText={lastNameError && 'Last name is required'}
              />
            </div>
            <TextField
              fullWidth
              type='email'
              label='Email address'
              variant='outlined'
              value={email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              error={emailError}
              helperText={emailError && 'Please enter your email'}
            />
            <TextField
              fullWidth
              label='Password'
              type={showPassword ? 'text' : 'password'}
              variant='outlined'
              value={password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
              error={passwordError}
              helperText={passwordError && 'Password is required'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleShowPassword}
                      edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              size='large'>
              Create account
            </Button>
          </Body>
        </form>
        <Typography
          variant='body2'
          sx={{ textAlign: 'center', fontSize: '0.8rem', mt: 2 }}
          className='policy'>
          By signing up, I agree to <Link>Terms of Service</Link> and{' '}
          <Link>Privacy Policy</Link>.
        </Typography>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
`;

const Container = styled.div`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  border-radius: 16px;
  padding: 40px 24px;
  z-index: 0;
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? '#333' : 'white'};
  border: ${({ theme }) => theme.palette.mode === 'dark' && '1px solid #333'};
  @media (max-width: 600px) {
    width: 90%;
  }
  @media (min-width: 600px) {
    width: 500px;
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
  .heading-title {
    margin: 0px;
    font-weight: 700;
    line-height: 1.5;
    font-size: 1.5rem;
    font-family: 'Public Sans', sans-serif;
  }
`;

const HeadingBody = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;

  a {
    margin: 0px;
    font-weight: 600;
    line-height: 1.57143;
    font-size: 0.875rem;
    font-family: 'Public Sans', sans-serif;
    color: ${({ theme }) => theme.palette.secondary.main};
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  button {
    text-transform: capitalize;
  }
  .name {
    display: flex;
    flex-direction: row;
    gap: 20px;
    @media (max-width: 600px) {
      flex-direction: column;
    }
  }
`;

export default Register;
