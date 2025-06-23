import { Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { green, blueGrey } from '@mui/material/colors';
import { TbDeviceDesktopCheck, TbDeviceDesktopX } from 'react-icons/tb';
import Cookies from 'js-cookie';

const DmStatusChecker = () => {
  const dispatch = useDispatch();
  const { isDmOnline } = useSelector((state) => state.user);
  const { isSocketConnecting } = useSelector((state) => state.home);
  const dmSerial = Cookies.get('dryermaster_dmSerial');

  const handleAction = () => {
    // Simulate toggle for now (you can change this to a real retry later)
    dispatch({
      type: 'user/getUserStateValues',
      payload: { name: 'isDmOnline', value: !isDmOnline },
    });
  };

  const Online = () => (
    <div>
      <TbDeviceDesktopCheck size={20} />
      <div className="span">
        <span>SN#{dmSerial}</span>
        <span>Online</span>
      </div>
    </div>
  );

  const Offline = () => (
    <div>
      <TbDeviceDesktopX size={20} />
      <div className="span">
        <span>SN#{dmSerial}</span>
        <span>Offline</span>
      </div>
    </div>
  );

  const Connecting = () => (
    <div>
      <CircularProgress size={20} color="inherit" />
      <div className="span">
        <span>SN#{dmSerial}</span>
        <span>Connecting...</span>
      </div>
    </div>
  );

  return (
    <Wrapper isDmOnline={isDmOnline} isSocketConnecting={isSocketConnecting}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAction}
        disabled={isSocketConnecting}
      >
        {isSocketConnecting ? (
          <Connecting />
        ) : isDmOnline ? (
          <Online />
        ) : (
          <Offline />
        )}
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .MuiButton-root {
    background-color: ${(props) =>
      props.isSocketConnecting
        ? blueGrey[500]
        : props.isDmOnline
        ? green[800]
        : blueGrey[800]};
    border-radius: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    div {
      display: flex;
      align-items: center;
      gap: 0.1rem;

      .span {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
      }
    }

    span {
      line-height: 0.8rem;
      margin-left: 0.5rem;
      font-size: 0.8rem;
    }
  }
`;

export default DmStatusChecker;
