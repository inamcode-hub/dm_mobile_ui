import React from 'react';
import { useSelector } from 'react-redux';
import DmRegister from './DmRegister';
import DmSubscription from './DmSubscription';
import DmReconnect from './DmReconnect';

const DmStatus = () => {
  const { isDmOnline, isSubscriptionActive, isDmRegistered } = useSelector(
    (state) => state.user
  );
  if (!isDmRegistered) {
    return <DmRegister />;
  } else if (!isSubscriptionActive) {
    return <DmSubscription />;
  } else if (!isDmOnline) {
    return <DmReconnect />;
  }

  return <div>DmStatus</div>;
};

export default DmStatus;
