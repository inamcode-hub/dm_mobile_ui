import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
} from 'react-icons/fa';
import styled from '@emotion/styled';

const ExistingPaymentMethods = () => {
  const { paymentCards } = useSelector((state) => state.userAccount);

  const getCardIcon = (brand) => {
    switch (
      brand.toLowerCase() // Ensure lowercase comparison
    ) {
      case 'visa':
        return <FaCcVisa />; // Visa blue
      case 'mastercard':
        return <FaCcMastercard />; // Mastercard red
      case 'americanexpress':
        return <FaCcAmex />; // Amex blue
      case 'discover':
        return <FaCcDiscover />; // Discover orange
      default:
        return <FaCcVisa />; // Default to Visa if unmatched
    }
  };

  return (
    <Wrapper>
      <Typography
        variant='h5'
        component='div'
        sx={{ marginBottom: '20px' }}>
        Existing Payment Methods
      </Typography>
      <Grid
        container
        spacing={2}>
        {paymentCards.map((item) => (
          <Grid
            item
            xs={12}
            md={6}
            key={item.id}>
            <PaymentCard>
              <CardContent>
                <CardDetails>
                  {getCardIcon(item.card.brand)}
                  <Typography variant='subtitle1'>
                    **** **** **** {item.card.last4}
                  </Typography>
                </CardDetails>
                <Typography
                  color='textSecondary'
                  className='card-expiry'>
                  Expires {item.card.exp_month}/{item.card.exp_year}
                </Typography>
                <CardActions>
                  <Button
                    variant='outlined'
                    color='primary'
                    size='small'>
                    Pay
                  </Button>
                  <Button
                    variant='outlined'
                    color='error'
                    size='small'>
                    Remove
                  </Button>
                </CardActions>
              </CardContent>
            </PaymentCard>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

// Styled components
const Wrapper = styled('div')`
  padding: 20px;
`;

const PaymentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CardDetails = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    font-size: 2.5rem;
    color: ${(props) =>
      props.theme.palette.mode === 'dark' ? '#fff' : 'var(--primary)'};
  }
`;

const CardActions = styled('div')`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export default ExistingPaymentMethods;
