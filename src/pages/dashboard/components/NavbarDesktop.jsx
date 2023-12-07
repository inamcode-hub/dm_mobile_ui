import styled from '@emotion/styled';
import { AppBar } from '@mui/material';
import ToggleTheme from '../../../components/ToggleTheme';
import UserCard from './subcomponents/UserCard';
import Notifications from './subcomponents/Notifications';

const NavbarDesktop = () => {
  return (
    <Wrapper>
      <AppBar
        position='static'
        className='app'>
        <div className='navbar'>
          <div className='info'>hello</div>
          <div className='theme'>
            <Notifications />
            <UserCard />
            <ToggleTheme />
          </div>
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
    .navbar {
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      .theme {
        display: flex;
        align-items: center;
      }
    }
  }
`;
export default NavbarDesktop;
