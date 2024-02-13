import styled from '@emotion/styled';
import { Button, ButtonGroup } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAccountStateValues } from '../../../../../../features/user/userAccountSlice';

const PaymentMethod = () => {
  const { showNewCard, paymentCards } = useSelector(
    (state) => state.userAccount
  );
  const dispatch = useDispatch();

  const handleCardChange = (e) => {
    dispatch(getUserAccountStateValues({ name: 'showNewCard', value: e }));
  };
  useEffect(() => {
    if (paymentCards.length === 0) {
      dispatch(getUserAccountStateValues({ name: 'showNewCard', value: true }));
    } else {
      dispatch(
        getUserAccountStateValues({ name: 'showNewCard', value: false })
      );
    }
  }, [paymentCards]);
  return (
    <Wrapper>
      <div className='heading'>
        <div className='title'>Renew Subscription</div>
        <div className='subscription_information'></div>
        <div className='options'>
          <ButtonGroup>
            <Button
              variant={showNewCard ? 'contained' : 'outlined'}
              color='primary'
              onClick={() => handleCardChange(true)}>
              New Card
            </Button>
            <Button
              variant={!showNewCard ? 'contained' : 'outlined'}
              color='primary'
              onClick={() => handleCardChange(false)}
              disabled={paymentCards.length === 0}>
              Existing Cards
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className='subscription_information'></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #d9d9d9;
  background-color: ${({ theme }) => theme.palette.background.paper};
  .title {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;
export default PaymentMethod;
