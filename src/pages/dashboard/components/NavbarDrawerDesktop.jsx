import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { getSystemStateValues } from '../../../features/system/systemSlice';
import { Button, Divider } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Logo from '../../../components/Logo';
const NavbarDrawerDesktop = () => {
  const dispatch = useDispatch();

  const { showDesktopDrawerText } = useSelector((state) => state.system);
  return (
    <Wrapper $showDesktopDrawerText={showDesktopDrawerText}>
      <div className='toggle-drawer'>
        <Button
          variant='text'
          onClick={() =>
            dispatch(
              getSystemStateValues({
                name: 'showDesktopDrawerText',
                value: !showDesktopDrawerText,
              })
            )
          }>
          {showDesktopDrawerText ? (
            <KeyboardArrowLeftIcon />
          ) : (
            <KeyboardArrowRightIcon />
          )}
        </Button>
      </div>
      <div className='header'>
        <Logo />
      </div>
      <Divider />
      <Body></Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  transition: width 0.3s ease-in-out;
  width: ${(props) => (props.$showDesktopDrawerText ? '300px' : '4rem')};
  background-color: ${(props) =>
    props.theme.mode === 'dark' ? '#333' : '#fff'};
  .toggle-drawer {
    position: absolute;
    top: 0;
    right: 0;
  }
  .header {
    width: ${(props) => (props.$showDesktopDrawerText ? '9rem' : '0rem')};
    overflow: hidden;
    transition: width 0.3s ease-in-out;
    height: 2.5rem;
    margin: 0 auto;
  }
`;

const Body = styled.div``;
export default NavbarDrawerDesktop;
