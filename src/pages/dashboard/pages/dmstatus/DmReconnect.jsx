import styled from '@emotion/styled';
import { Button, CircularProgress, Typography, useTheme } from '@mui/material';
import { green, blueGrey, orange } from '@mui/material/colors';

import AutorenewIcon from '@mui/icons-material/Autorenew';
import SignalWifiStatusbarConnectedNoInternet4RoundedIcon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4Rounded';
import SignalCellularConnectedNoInternet4BarRoundedIcon from '@mui/icons-material/SignalCellularConnectedNoInternet4BarRounded';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

import CardWrapper from '../../../../styles/wrappers/CardWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { openHomeStream } from '../../../../features/home/homeSlice';

const DmReconnect = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
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
          <div className="title">We’re reconnecting you...</div>
          <Typography variant="body2">
            Looks like your browser lost connection to the DryerMaster server.
            Here’s what you can try while we work on reconnecting:
          </Typography>

          <ul>
            <li>
              <SignalWifiStatusbarConnectedNoInternet4RoundedIcon
                sx={{ mr: 1 }}
              />
              Double-check your internet connection is active.
            </li>
            <li>
              <SignalCellularConnectedNoInternet4BarRoundedIcon
                sx={{ mr: 1 }}
              />
              A weak signal or firewall might be blocking access.
            </li>
            <li>
              <RestartAltIcon sx={{ mr: 1 }} />
              Refresh this page.
            </li>
            <li>
              <SupportAgentIcon sx={{ mr: 1 }} />
              Need help? Reach out to our support team anytime.
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
              {isSocketConnecting ? 'Trying to reconnect...' : 'Reconnect Now'}
            </Button>

            {isSocketConnecting && (
              <CircularProgress
                size={22}
                thickness={4}
                className="spinner"
                sx={{
                  color:
                    theme.palette.mode === 'dark'
                      ? theme.palette.info.main
                      : theme.palette.primary.main,
                }}
              />
            )}
          </div>

          {isSocketConnecting && (
            <Typography variant="caption" className="subtext">
              Establishing a secure connection to DryerMaster...
            </Typography>
          )}
        </div>
      </CardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 1rem auto;
  max-width: 400px;
  width: 100%;

  .status-card {
    padding: 1rem;
    border-radius: 1rem;
    background-color: ${({ isSocketConnecting, isOnline }) =>
      isSocketConnecting ? orange[50] : isOnline ? green[50] : blueGrey[50]};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    transition: background-color 0.3s ease;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    user-select: none;

    &:hover {
      opacity: 0.9;
    }
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    span,
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .details {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.85rem;
    color: #333;

    p {
      margin: 0;
    }
  }
`;

export default DmReconnect;
