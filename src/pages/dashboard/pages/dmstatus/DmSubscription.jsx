import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew'; // Importing the icon
import React from 'react';
import { format, set } from 'date-fns';
import { getUserCookies } from '../../../../features/user/lib';

const DmSubscription = () => {
  const [expiryDate, setExpiryDate] = React.useState('');

  React.useEffect(() => {
    const expiry = getUserCookies('dryermaster_subscriptionExpiry');
    if (expiry) {
      setExpiryDate(format(new Date(expiry), 'dd MMMM yyyy'));
    }
  }, []);
  return (
    <Wrapper>
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

    color: ${({ theme }) => theme.palette.info.main};
  }
  .body {
    display: grid;
    gap: 1rem;
    strong {
      color: ${({ theme }) => theme.palette.error.main};
      white-space: nowrap;
    }
  }
`;

export default DmSubscription;
