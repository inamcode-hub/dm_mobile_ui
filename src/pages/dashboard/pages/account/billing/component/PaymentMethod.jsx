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

  const handleCardChange = (showNewCard) => {
    dispatch(
      getUserAccountStateValues({ name: 'showNewCard', value: showNewCard })
    );
  };

  useEffect(() => {
    dispatch(
      getUserAccountStateValues({
        name: 'showNewCard',
        value: paymentCards.length === 0,
      })
    );
  }, [paymentCards, dispatch]);

  return (
    <Wrapper>
      <Heading>
        <Title>Renew Subscription</Title>
        <SubscriptionInfo>
          <InfoItem>
            Amount: <strong>$100.00 USD</strong>
          </InfoItem>
          <InfoItem>
            Frequency: <strong>Yearly</strong>
          </InfoItem>
          <InfoItem>
            Expiry Date: <strong>12/12/2022</strong>
          </InfoItem>
          <InfoItem>
            Renewal Date: <strong>12/12/2022</strong>
          </InfoItem>
        </SubscriptionInfo>
      </Heading>
      <Options>
        <StyledButtonGroup
          variant='contained'
          color='primary'>
          <Button
            variant={showNewCard ? 'contained' : 'outlined'}
            onClick={() => handleCardChange(true)}>
            New Card
          </Button>
          <Button
            variant={!showNewCard ? 'contained' : 'outlined'}
            onClick={() => handleCardChange(false)}
            disabled={paymentCards.length === 0}>
            Existing Cards
          </Button>
        </StyledButtonGroup>
      </Options>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #d9d9d9;
  background-color: ${({ theme }) => theme.palette.background.paper};
  display: grid;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.div``;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SubscriptionInfo = styled.div`
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  font-size: 1rem;
  margin: 0.25rem 0;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 0.5rem;

  display: flex;
  justify-content: space-between;
  max-width: 400px;
`;

const Options = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  & .MuiButton-root {
    /* margin-right: 10px; */
    width: 150px;
  }
`;

export default PaymentMethod;
