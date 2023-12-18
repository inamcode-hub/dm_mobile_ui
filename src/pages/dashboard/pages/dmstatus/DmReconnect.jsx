import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew'; // Importing the icon
import React from 'react';
import Cookies from 'js-cookie';
import { format } from 'date-fns';

const DmReconnect = () => {
  const expiryDate = new Date(Cookies.get('dryermaster_subscriptionExpiry'));
  const expiry = format(expiryDate, 'do MMMM yyyy');
  return (
    <Wrapper>
      <div className='body'>
        <Typography
          variant='h4'
          component='h2'>
          Offline
        </Typography>
        <Typography variant='body1'>
          Your DryerMaster is offline. Check your internet connection.
        </Typography>
        <Button
          variant='contained'
          size='large'
          startIcon={<AutorenewIcon />} // Adding the icon to the button
        >
          Reconnect Now
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  margin: 1rem;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows[2]};
  background-color: ${({ theme }) => theme.palette.background.paper};
  max-width: 600px;
  @media (min-width: 600px) {
    margin: 3rem auto;
  }
  h2 {
    font-weight: 500;

    color: ${({ theme }) => theme.palette.error.main};
  }
  .body {
    display: grid;
    gap: 1rem;
  }
`;

export default DmReconnect;
