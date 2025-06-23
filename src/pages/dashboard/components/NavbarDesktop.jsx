import styled from '@emotion/styled';
import { AppBar } from '@mui/material';
import ToggleTheme from '../../../components/ToggleTheme';
import UserCard from './subcomponents/UserCard';
import Notifications from './subcomponents/Notifications';
import DmStatusChecker from '../../../components/DmStatusChecker';

const NavbarDesktop = () => {
  return (
    <Wrapper>
      <AppBar position="static" className="app">
        <div className="navbar">
          <div className="info">
            <h1>Dashboard</h1>
          </div>
          <div className="theme">
            <DmStatusChecker />
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
  z-index: 999;
  .info {
    h1 {
      @media (max-width: 900px) {
        display: none;
      }
    }
  }
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
        gap: 1rem;
        padding-right: 1rem;
        position: relative;

        .status-card {
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          background-color: var(--card-bg, #f1f1f1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          font-size: 0.85rem;
          cursor: default;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        svg {
          vertical-align: middle;
        }
      }
    }
  }
`;
export default NavbarDesktop;
