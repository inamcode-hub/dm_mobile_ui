import React from 'react';
import ExistingPaymentMethods from './component/ExistingPaymentMethods';
import PaymentDetails from './component/paymentDetails';

const Billing = () => {
  return (
    <div>
      <ExistingPaymentMethods />
      <PaymentDetails />
    </div>
  );
};

export default Billing;
