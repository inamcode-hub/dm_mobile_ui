import { Button, Divider, Drawer } from '@mui/material';
import { getSystemStateValues } from '../../../features/system/systemSlice';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Logo from '../../../components/Logo';
import ToggleTheme from '../../../components/ToggleTheme';
import NavbarList from './subcomponents/NavbarList';

const NavbarDrawerMobile = () => {
  const dispatch = useDispatch();

  const { isMobileNavbarOpen } = useSelector((state) => state.system);

  const closeNavbar = () => {
    dispatch(
      getSystemStateValues({ name: 'isMobileNavbarOpen', value: false })
    );
  };

  return (
    <>
      <Drawer
        anchor='left'
        open={isMobileNavbarOpen}
        onClose={closeNavbar}>
        <Wrapper>
          <div className='header'>
            <Logo />
          </div>
          <Divider />
          <NavbarList />
          <Footer>
            <Button
              onClick={closeNavbar}
              variant='outlined'>
              close
            </Button>
            <ToggleTheme />
          </Footer>
        </Wrapper>
      </Drawer>
    </>
  );
};
const Wrapper = styled.div`
  width: 70vw;
  height: 100vh;
  /* background-color: ${(props) =>
    props.theme.palette.mode === 'light'
      ? props.theme.palette.background.paper
      : props.theme.palette.grey[900]}; */
  .header {
    display: flex;
    align-items: center;
    margin-left: 1rem;
    height: 3.6rem;
    @media (min-width: 600px) {
      height: 4rem;
    }
  }
`;

const Footer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  max-width: 70vw;
  padding: 1rem;
  width: 100%;
  button {
    margin: 0;
  }
`;
export default NavbarDrawerMobile;
