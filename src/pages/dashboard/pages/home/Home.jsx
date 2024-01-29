import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import DmStatus from '../dmstatus/DmStatus';
import Cards from './components/cards/Cards';
import Chart from './components/chart/Chart';
import Controller from './components/control/Controller';

const Home = () => {
  const { isDmOnline, isSubscriptionActive } = useSelector(
    (state) => state.user
  );
  if (!isSubscriptionActive || !isDmOnline) {
    return <DmStatus />;
  }
  return (
    <Wrapper>
      <Cards />
      <Chart />
      <Controller />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* min-height: 300vh; */
`;
export default Home;
