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

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
};
const ForgotPasswordUpdate = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const [state, setState] = useState(initialState);
  const { firstName, lastName } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <Wrapper>
      <Container>
        <Heading>
          <Typography
            variant='h4'
            className='heading-title'>
            User Profile
          </Typography>
        </Heading>
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
                onChange={(e) =>
                  setState({ ...state, firstName: e.target.value })
                }
                required
              />
              {/* <Divider
              sx={{
                margin: '10px 0',
              }}
            /> */}
              <TextField
                fullWidth
                label='Last Name'
                type='text'
                variant='outlined'
                name='lastName'
                value={lastName}
                onChange={(e) =>
                  setState({ ...state, lastName: e.target.value })
                }
                required
              />
            </InputFields>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              size='large'
              disabled={isLoading}>
              {isLoading ? (
                <>
                  <CircularProgress
                    size={24}
                    color='inherit'
                    style={{ marginRight: '10px' }} // Add some spacing between the spinner and the text
                  />
                  Updating...
                </>
              ) : (
                'Save changes'
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
  /* min-height: 100vh; */
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
  @media (min-width: 960px) {
    width: 800px;
  }
  .link {
    text-decoration: none;
    color: ${({ theme }) => (theme.palette.mode === 'dark' ? '#fff' : '#000')};
    :hover {
      text-decoration: underline;
    }
    p {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .code {
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      margin: 0px;
    }
    button {
      color: ${({ theme }) => theme.palette.secondary.main};
    }
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
  text-align: center;
  .heading-title {
    margin: 0px;
    font-weight: 700;
    line-height: 1.5;
    font-size: 1.5rem;
    font-family: 'Public Sans', sans-serif;
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
