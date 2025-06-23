import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

import Cards from './components/cards/Cards';
import Chart from './components/chart/Chart';
import Controller from './components/control/Controller';
import Information from './components/information/Information';
import MoistureSetPoint from './components/dialog/MoistureSetPoint';
import DischargeRateSetPoint from './components/dialog/DischargeRateSetPoint';
import ModeControl from './components/dialog/ModeControl';

import { openHomeStream } from '../../../../features/home/homeSlice';
import DmSubscription from '../dmstatus/DmSubscription';
import DmReconnect from '../dmstatus/DmReconnect';

const Home = () => {
  const dispatch = useDispatch();

  const { isSubscriptionActive } = useSelector((state) => state.user);
  const { connectionStatus } = useSelector((state) => state.home);

  // Initiate WebSocket connection
  React.useEffect(() => {
    if (isSubscriptionActive) {
      dispatch(openHomeStream());
    }
  }, [isSubscriptionActive, dispatch]);

  // 1. Not subscribed
  if (!isSubscriptionActive) {
    return <DmSubscription />;
  }

  // 3. Socket connected but device is offline
  if (connectionStatus?.status !== 'online') {
    return <DmReconnect />;
  }

  // 4. Device is online
  return (
    <Wrapper>
      <MoistureSetPoint />
      <DischargeRateSetPoint />
      <ModeControl />
      <Cards />
      <Chart />
      <Controller />
      <Information />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* Full dashboard wrapper */
`;

export default Home;
