import styled from '@emotion/styled';
import { AppBar } from '@mui/material';
import ToggleTheme from '../../../components/ToggleTheme';

const NavbarDesktop = () => {
  return (
    <Wrapper>
      <AppBar
        position='static'
        className='app'>
        <div className='theme'>
          <ToggleTheme />
        </div>
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
    display: flex;
    .theme {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 100%;
      padding-right: 1rem;
    }
  }
`;
export default NavbarDesktop;
