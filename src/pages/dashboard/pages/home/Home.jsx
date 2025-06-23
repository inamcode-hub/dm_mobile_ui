import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import Cards from './components/cards/Cards';
import Chart from './components/chart/Chart';
import Controller from './components/control/Controller';
import Information from './components/information/Information';
import MoistureSetPoint from './components/dialog/MoistureSetPoint';
import DischargeRateSetPoint from './components/dialog/DischargeRateSetPoint';
import ModeControl from './components/dialog/ModeControl';
import React from 'react';
import { openHomeStream } from '../../../../features/home/homeSlice';
import DmSubscription from '../dmstatus/DmSubscription';
import DmReconnect from '../dmstatus/DmReconnect';

const Home = () => {
  const dispatch = useDispatch();
  const { isSubscriptionActive } = useSelector((state) => state.user);
  const { connectionStatus } = useSelector((state) => state.home);

  React.useEffect(() => {
    if (isSubscriptionActive) {
      dispatch(openHomeStream());
    }
  }, []);

  if (!isSubscriptionActive) {
    return <DmSubscription />;
  }
  if (connectionStatus?.status !== 'online') {
    return <DmReconnect />;
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
  /* min-height: 300vh; */
`;
export default Home;
