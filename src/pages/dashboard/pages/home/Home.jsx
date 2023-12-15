import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import Cards from './Cards';
import DmStatus from '../dmstatus/DmStatus';

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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* min-height: 300vh; */
`;
export default Home;
