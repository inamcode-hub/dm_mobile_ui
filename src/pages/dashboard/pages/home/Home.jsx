import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import DmStatus from '../dmstatus/DmStatus';
import Cards from './components/cards/Cards';
import Chart from './components/chart/Chart';
import Controller from './components/control/Controller';
import Information from './components/information/Information';
import MoistureSetPoint from './components/dialog/MoistureSetPoint';
import DischargeRateSetPoint from './components/dialog/DischargeRateSetPoint';
import ModeControl from './components/dialog/ModeControl';
import React from 'react';
import { openHomeStream } from '../../../../features/home/homeSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { isDmOnline, isSubscriptionActive } = useSelector(
    (state) => state.user
  );

  React.useEffect(() => {
    if (isSubscriptionActive) {
      dispatch(openHomeStream());
    }
  }, [dispatch]);
  if (!isSubscriptionActive || !isDmOnline) {
    return <DmStatus />;
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
