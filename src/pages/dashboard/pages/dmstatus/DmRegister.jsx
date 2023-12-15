import styled from '@emotion/styled';
import { Button, Divider, TextField } from '@mui/material';
import React from 'react';

const DmRegister = () => {
  return (
    <Wrapper>
      <div className='card'>
        <div className='heading'>
          <h3>Register your Dryer Master</h3>
        </div>
        <div className='body'>
          <TextField
            id='outlined-basic'
            label='Serial Number'
            variant='outlined'
            className='input'
            size='small'
          />
          <Button variant='contained'>Register</Button>
        </div>
        <Divider />
        <p>Need help finding your serial number?</p>
        <div className='actions'>
          <Button variant='outlined'>Contact Us</Button>
          <Button variant='outlined'>Watch video</Button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .card {
    padding: 1rem;
    margin: 1rem;
    border-radius: 0.5rem;
    box-shadow: ${({ theme }) => theme.shadows[1]};
    background-color: ${({ theme }) => theme.palette.background.paper};
    max-width: 40rem;
    margin: 0 auto;
    margin-top: 2rem;
    .heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
      .input {
        width: 100%;
      }
    }
    .actions {
      display: flex;
      gap: 1rem;
    }
  }
`;
export default DmRegister;
