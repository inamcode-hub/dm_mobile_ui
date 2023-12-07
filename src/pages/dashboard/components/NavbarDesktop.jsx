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
    height: 2.5rem;
    /* box-shadow: ${({ theme }) => theme.shadows[3]}; */
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;
export default NavbarDesktop;
