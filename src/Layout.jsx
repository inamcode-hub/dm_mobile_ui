import { Outlet } from 'react-router-dom';

import styled from '@emotion/styled';

const Layout = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
`;

export default Layout;
