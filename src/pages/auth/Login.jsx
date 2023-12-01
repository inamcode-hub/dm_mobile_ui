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
import useFormValidation from '../../hooks/useFormValidation';

const Login = () => {
  const { formState, validateEmail, validatePassword, handleChange } =
    useFormValidation();
  const {
    email,
    password,
    emailError,
    passwordError,
    emailErrorList,
    passwordErrorList,
  } = formState;
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
    }
  };

  return (
    <Wrapper>
      <Container>
        <Heading>
          <Typography
            variant='h4'
            className='heading-title'>
            Sign in to DryerMaster
          </Typography>
          <HeadingBody>
            <Typography
              variant='body2'
              className='new-user'>
              New User?
            </Typography>
            <Link to='/register'>
              <Typography
                variant='body2'
                sx={{ fontWeight: 500 }}>
                Create an account
              </Typography>
            </Link>
          </HeadingBody>
        </Heading>
        <form onSubmit={handleSubmit}>
          <Body>
            <TextField
              fullWidth
              type='email'
              label='Email address'
              variant='outlined'
              name='email'
              value={email}
              onChange={handleFieldChange}
              error={emailError}
            />
            {emailError && (
              <ErrorList>
                {emailErrorList.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ErrorList>
            )}
            <TextField
              fullWidth
              label='Password'
              type={showPassword ? 'text' : 'password'}
              variant='outlined'
              name='password'
              value={password}
              onChange={handleFieldChange}
              error={passwordError}
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
            {passwordError && (
              <ErrorList>
                {passwordErrorList.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ErrorList>
            )}
            <ForgotPassword>
              <Link to='/forgot-password'>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 500 }}>
                  Forgot password?
                </Typography>
              </Link>
            </ForgotPassword>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              size='large'>
              Login
            </Button>
            <ToggleTheme />
          </Body>
        </form>
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
  .MuiFormHelperText-root {
    margin-top: 0px;
    margin-bottom: 0px;
    ul {
      padding: 0px;
      li {
        margin-left: 0px;
      }
    }
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
  button {
    text-transform: capitalize;
  }
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
`;
const ErrorList = styled.ul`
  color: ${({ theme }) => theme.palette.error.main};
  margin: 0px;
  list-style: inside;
  font-size: 0.8rem;
  padding-left: 0;
`;
const ForgotPassword = styled.div`
  display: flex;
  justify-content: flex-end;
  a {
    color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? 'white' : 'black'};
  }
`;

export default Login;
