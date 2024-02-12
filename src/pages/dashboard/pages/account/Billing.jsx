import React from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import styled from '@emotion/styled';

import { getUserCookies } from '../../../../features/user/lib'; // Ensure the path is correct
import { customFetch } from '../../../../lib/customeFetch';
import { toast } from 'react-toastify';

const ELEMENT_OPTIONS = {
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
      console.log('Stripe has not fully loaded yet.');
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);
    // Stripe Elements does not support a separate PostalCodeElement
    // You would need to handle the postal code as a normal input field if required

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
      // Additional information can be included here if necessary
    });

    if (!error) {
      const { id } = paymentMethod;
      try {
        const token = getUserCookies('dryermaster_token'); // Adjust the cookie name as needed
        const response = await customFetch.post(
          '/dryermaster/account/stripe', // Your specific endpoint
          { paymentMethodId: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Payment success:', response);
        toast.success(response.data.message);
      } catch (error) {
        console.error('Payment error:', error);
        toast.error(error.response.data.message);
      }
    } else {
      console.error('Stripe error:', error);
    }
  };

  return (
    <Wrapper>
      <StyledForm onSubmit={handleSubmit}>
        <Label>
          Card Number
          <CardNumberElement options={ELEMENT_OPTIONS} />
        </Label>
        <Label>
          Expiry Date
          <CardExpiryElement options={ELEMENT_OPTIONS} />
        </Label>
        <Label>
          CVC
          <CardCvcElement options={ELEMENT_OPTIONS} />
        </Label>
        {/* Implement the postal code as a normal input field if necessary */}
        <PayButton
          type='submit'
          disabled={!stripe}>
          Pay
        </PayButton>
      </StyledForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #f6f9fc;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 50px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #6b7c93;
  font-weight: 300;
  letter-spacing: 0.025em;
  margin-bottom: 10px;
  display: block;
`;

const PayButton = styled.button`
  background-color: #6772e5;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  padding: 10px 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #5469d4;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Billing;
