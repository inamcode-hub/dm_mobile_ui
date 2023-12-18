import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Cookies from 'js-cookie';
import React from 'react';

const Messages = () => {
  const handleExpireSubscription = () => {
    const expiryDate = new Date(Cookies.get('dryermaster_subscriptionExpiry'));
    expiryDate.setFullYear(expiryDate.getFullYear() - 1);
    const formattedNewExpiryDate = expiryDate.toISOString();
    Cookies.set('dryermaster_subscriptionExpiry', formattedNewExpiryDate);
  };

  const handleExtendSubscription = () => {
    const expiryDate = new Date(Cookies.get('dryermaster_subscriptionExpiry'));
    const newExpiryDate = expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    const formattedNewExpiryDate = new Date(newExpiryDate).toISOString();
    Cookies.set('dryermaster_subscriptionExpiry', formattedNewExpiryDate);
  };
  return (
    <Wrapper>
      <div className='subscription'>
        <div className='expire_subscription'>
          <p></p>
          <Button
            onClick={handleExpireSubscription}
            variant='contained'
            color='primary'>
            Expire Subscription
          </Button>
          <Button
            onClick={handleExtendSubscription}
            variant='contained'
            color='primary'>
            Extend Subscription
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .subscription {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
    .expire_subscription {
      display: flex;
      gap: 1rem;
    }
  }
`;
export default Messages;
