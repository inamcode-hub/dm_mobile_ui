import styled from '@emotion/styled';
import { Button, CircularProgress, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import WifiIcon from '@mui/icons-material/Wifi';
import SpeedIcon from '@mui/icons-material/Speed';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CardWrapper from '../../../../styles/wrappers/CardWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { openHomeStream } from '../../../../features/home/homeSlice';

const DmReconnect = () => {
  const dispatch = useDispatch();
  const { isSocketConnecting } = useSelector((state) => state.home);

  const handleReconnect = () => {
    if (!isSocketConnecting) {
      dispatch(openHomeStream());
    }
  };

  return (
    <Wrapper>
      <CardWrapper>
        <div className="body">
          <div className="title">Trouble Connecting to DryerMaster</div>
          <Typography variant="body1">
            We couldn’t establish a connection to your DryerMaster device. Try
            the following steps:
          </Typography>
          <ul>
            <li>
              <WifiIcon
                sx={{ verticalAlign: 'middle', marginRight: '.5rem' }}
              />
              Ensure your Wi-Fi is connected and internet access is active.
            </li>
            <li>
              <SpeedIcon
                sx={{ verticalAlign: 'middle', marginRight: '.5rem' }}
              />
              Make sure your connection is stable and not throttled.
            </li>
            <li>
              <RestartAltIcon
                sx={{ verticalAlign: 'middle', marginRight: '.5rem' }}
              />
              Restart your DryerMaster device and your router if needed.
            </li>
            <li>
              <ContactSupportIcon
                sx={{ verticalAlign: 'middle', marginRight: '.5rem' }}
              />
              Still stuck? Contact DryerMaster support for help.
            </li>
          </ul>

          <div className="action">
            <Button
              variant="contained"
              size="large"
              startIcon={<AutorenewIcon />}
              onClick={handleReconnect}
              disabled={isSocketConnecting}
            >
              {isSocketConnecting ? 'Reconnecting...' : 'Try Reconnect'}
            </Button>
            {isSocketConnecting && (
              <CircularProgress size={24} className="spinner" />
            )}
          </div>
        </div>
      </CardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .body {
    display: grid;
    gap: 1rem;

    ul {
      margin: 0;
      padding-left: 0px;
      list-style: none;
    }

    li {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
    }

    .action {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .spinner {
      margin-left: 0.5rem;
    }
  }

  .title {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) =>
      theme.palette.mode === 'dark'
        ? theme.palette.info.main
        : 'var(--primary-text)'};
  }
`;

export default DmReconnect;
