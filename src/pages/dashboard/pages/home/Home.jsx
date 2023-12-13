import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import Cards from './Cards';
import DmStatus from '../DmStatus';

const Home = () => {
  const { isDmOnline } = useSelector((state) => state.user);
  if (!isDmOnline) {
    return (
      <Wrapper>
        <DmStatus />
      </Wrapper>
    );
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
