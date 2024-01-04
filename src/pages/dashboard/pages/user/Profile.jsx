import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import Address from './component/profile_address';
import {
  getUserProfileStateValues,
  userProfileReadThunk,
  userProfileUpdateThunk,
} from '../../../../features/user/userProfileSlice';
import MobilePicker from './component/profile_mobile';
import Loading from '../../../../components/Loading';
import { grey } from '@mui/material/colors';

const ForgotPasswordUpdate = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    isUpdating,
    firstName,
    lastName,
    farmName,
    email,
    cellPhone,
  } = useSelector((state) => state.userProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(getUserProfileStateValues({ name, value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userProfileUpdateThunk());
  };

  useEffect(() => {
    dispatch(userProfileReadThunk());
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Container>
        <div className='title'>User Profile</div>
        <form onSubmit={handleSubmit}>
          <Body>
            <InputFields>
              <TextField
                fullWidth
                label='First Name'
                type='text'
                variant='outlined'
                name='firstName'
                value={firstName}
                onChange={(e) => handleChange(e)}
                required
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                label='Last Name'
                type='text'
                variant='outlined'
                name='lastName'
                value={lastName}
                onChange={(e) => handleChange(e)}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label='Farm Name'
                type='text'
                variant='outlined'
                name='farmName'
                value={farmName}
                onChange={(e) => handleChange(e)}
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label='Email'
                type='email'
                variant='outlined'
                name='email'
                value={email}
                onChange={(e) => handleChange(e)}
                required
                InputLabelProps={{ shrink: true }}
              />
              <MobilePicker />
            </InputFields>
            <Divider
              sx={{
                margin: '10px 0',
              }}>
              Address
            </Divider>
            <Address />
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              size='large'
              disabled={isLoading || isUpdating}>
              {isUpdating ? (
                <>
                  <CircularProgress
                    size={24}
                    color='inherit'
                    style={{ marginRight: '10px' }} // Add some spacing between the spinner and the text
                  />
                  Updating...
                </>
              ) : (
                'Update Profile'
              )}
            </Button>
          </Body>
        </form>
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const Container = styled.div`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,
    rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
  border-radius: 16px;
  padding: 20px 20px;
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
  @media (min-width: 960px) {
    width: 60vw;
  }
  .title {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1rem;
    text-align: center;
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? grey[900] : 'var(--primary-2)'};
    color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? 'var(--primary-2)' : 'var(--primary-18)'};
    padding: 0.5rem 1rem;
    border-radius: 5px;
    margin-bottom: 3rem;
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
const InputFields = styled.div`
  display: grid;
  gap: 1em;
  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export default ForgotPasswordUpdate;
