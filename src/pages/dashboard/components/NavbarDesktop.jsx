import styled from '@emotion/styled';
import { AppBar } from '@mui/material';

const NavbarDesktop = () => {
  return (
    <Wrapper>
      <AppBar
        position='static'
        className='app'>
        AppBar
      </AppBar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  .app {
    height: 3.5rem;
  }
`;
export default NavbarDesktop;
