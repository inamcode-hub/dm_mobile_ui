import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getStateValues } from '../features/user/userSlice';
import styled from '@emotion/styled';
import { green, grey, orange } from '@mui/material/colors';
import { TbDeviceDesktopCheck } from 'react-icons/tb';
import { TbDeviceDesktopX } from 'react-icons/tb';
const DmStatusChecker = () => {
  const dispatch = useDispatch();
  const { isDmOnline } = useSelector((state) => state.user);
  const handleAction = () => {
    dispatch(getStateValues({ name: 'isDmOnline', value: !isDmOnline }));
  };
  const Online = () => {
    return (
      <div>
        <TbDeviceDesktopCheck size={20} />
        <span>Online</span>
      </div>
    );
  };
  const Offline = () => {
    return (
      <div>
        <TbDeviceDesktopX size={20} />
        <span>Offline</span>
      </div>
    );
  };
  return (
    <Wrapper isDmOnline={isDmOnline}>
      <Button
        variant='contained'
        color='primary'
        onClick={handleAction}>
        {isDmOnline ? <Online /> : <Offline />}
      </Button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .MuiButton-root {
    background-color: ${(props) => (props.isDmOnline ? green[800] : grey[700])};
    color: white;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    div {
      display: flex;
      align-items: center;
      gap: 0.1rem;
    }
    span {
      font-weight: 400;
      margin-left: 0.5rem;
    }
  }
`;

export default DmStatusChecker;
