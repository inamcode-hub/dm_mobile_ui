import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import NavbarDesktop from './components/NavbarDesktop';
import NavbarMobile from './components/NavbarMobile';
import NavbarDrawerMobile from './components/NavbarDrawerMobile';
import { useWindowSize } from '../../hooks/useWindowSize';
import { getSystemStateValues } from '../../features/system/systemSlice';
import NavbarDrawerDesktop from './components/NavbarDrawerDesktop';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (width > 768) {
      dispatch(
        getSystemStateValues({ name: 'isMobileNavbarOpen', value: false })
      );
    }
  }, [width, height]);

  return (
    <Wrapper>
      <div className='desktop'>
        <div className='drawer'>
          <NavbarDrawerDesktop />
        </div>
        <div className='nav-outlet'>
          <NavbarDesktop />
          <Outlet />
        </div>
      </div>
      <div className='mobile'>
        <NavbarDrawerMobile />
        <NavbarMobile />
        <Outlet />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .mobile {
    @media (min-width: 769px) {
      display: none;
    }
  }
  .desktop {
    @media (max-width: 768px) {
      display: none;
    }
    display: flex;
    .nav-outlet {
      width: 100%;
    }
  }
`;
export default DashboardLayout;
