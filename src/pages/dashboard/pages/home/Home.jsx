import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

const getConnectionState = (isSocketConnected, connectionStatus) => {
  if (!isSocketConnected) return 'no-server';
  if (!connectionStatus) return 'waiting-device';
  if (connectionStatus.status === 'online') return 'online';
  return 'offline-device';
};

const Home = () => {
  const dispatch = useDispatch();
  const { isSubscriptionActive } = useSelector((state) => state.user);
  const { isSocketConnected, connectionStatus, isSocketConnecting } =
    useSelector((state) => state.home);

  useEffect(() => {
    if (isSubscriptionActive && !isSocketConnected && !isSocketConnecting) {
      dispatch(openHomeStream());
    }
  }, [isSubscriptionActive, isSocketConnected, isSocketConnecting, dispatch]);

  if (!isSubscriptionActive) {
    return <DmSubscription />;
  }

  const status = getConnectionState(isSocketConnected, connectionStatus);

  if (status === 'no-server') {
    return <DmReconnect status="no-server" message="Connecting to server..." />;
  }

  if (status === 'waiting-device') {
    return (
      <DmReconnect
        status="waiting-device"
        message="Waiting for device status..."
      />
    );
  }

  if (status === 'offline-device') {
    return (
      <DmReconnect
        status="offline-device"
        message="Device is currently offline."
      />
    );
  }

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
  padding: 1rem;
`;

export default Home;
