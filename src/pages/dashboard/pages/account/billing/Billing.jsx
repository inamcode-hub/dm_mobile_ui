import React, { useEffect } from 'react';
import ExistingPaymentMethods from './component/ExistingPaymentMethods';
import PaymentDetails from './component/paymentDetails';
import { useDispatch } from 'react-redux';
import { userAccountPaymentCardsThunk } from '../../../../../features/user/userAccountSlice';

const Billing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userAccountPaymentCardsThunk());
  }, []);
  return (
    <div>
      <PaymentDetails />
      <ExistingPaymentMethods />
    </div>
  );
};

export default Billing;
