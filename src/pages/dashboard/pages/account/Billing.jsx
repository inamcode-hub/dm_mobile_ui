import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from '@emotion/styled';
import { customFetch } from '../../../../lib/customeFetch'; // Ensure this path is correct
import { getUserCookies } from '../../../../features/user/lib'; // Ensure this path is correct

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const Billing = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Make sure Stripe.js has loaded
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (!error) {
      const { id } = paymentMethod;
      try {
        const token = getUserCookies('dryermaster_token'); // Ensure this function works as expected
        const response = await customFetch.post(
          '/dryermaster/account/stripe',
          { paymentMethodId: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // The return statement should be directly inside the component function, not nested in any other function
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
        <button
          type='submit'
          disabled={!stripe}>
          Pay
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* your styles here */
`;

export default Billing;
