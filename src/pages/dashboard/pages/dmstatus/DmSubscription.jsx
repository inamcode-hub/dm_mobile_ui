import styled from '@emotion/styled';
import { Button, Card, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew'; // Importing the icon
import React from 'react';
import { format, set } from 'date-fns';

import { useSelector } from 'react-redux';
import CardWrapper from '../../../../styles/warppers/CardWrapper';

const DmSubscription = () => {
  const { subscriptionExpiry } = useSelector((state) => state.user);
  const expiryDate =
    subscriptionExpiry && format(new Date(subscriptionExpiry), 'dd MMMM yyyy');
  return (
    <Wrapper>
      <CardWrapper>
        <div className='body'>
          <Typography
            variant='h4'
            component='h2'>
            Subscription Expired
          </Typography>
          <Typography variant='body1'>
            Thank you for using Dryer Master. Your subscription period has ended
            on <strong>{expiryDate}</strong>. To continue enjoying our services,
            please renew your subscription.
          </Typography>
          <Button
            variant='contained'
            size='large'
            startIcon={<AutorenewIcon />} // Adding the icon to the button
          >
            Renew Subscription
          </Button>
        </div>
      </CardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 3rem;
  display: grid;
  place-items: center;
  h2 {
    font-weight: 500;
    color: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? theme.palette.info.main
        : 'var(--primary-text)'};
  }
  .body {
    display: grid;
    gap: 1rem;
    strong {
      color: ${({ theme }) => theme.palette.info.main};
      white-space: nowrap;
    }
  }
`;

export default DmSubscription;
