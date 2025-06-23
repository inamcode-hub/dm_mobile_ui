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
  const { isSocketConnecting, connectionStatus } = useSelector(
    (state) => state.home
  );

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

  // 2. Socket is still connecting
  if (isSocketConnecting) {
    return (
      <LoadingWrapper>
        <div className="loader" />
        <p>Connecting to live stream...</p>
      </LoadingWrapper>
    );
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

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  font-size: 1.2rem;

  .loader {
    width: 40px;
    height: 40px;
    border: 5px solid #ccc;
    border-top-color: #0077ff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 16px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Home;
