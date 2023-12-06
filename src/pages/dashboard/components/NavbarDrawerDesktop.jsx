import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { getSystemStateValues } from '../../../features/system/systemSlice';
import { Button } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
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

      <div className='drawer'>Desktop drawer</div>
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
`;
export default NavbarDrawerDesktop;
