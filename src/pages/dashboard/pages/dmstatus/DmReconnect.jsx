import styled from '@emotion/styled';
import { Button, CircularProgress, Typography, useTheme } from '@mui/material';

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
      font-size: 0.95rem;
    }

    .action {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .spinner {
      margin-left: 0.5rem;
    }

    .subtext {
      color: ${({ theme }) =>
        theme.palette.mode === 'dark'
          ? theme.palette.grey[400]
          : theme.palette.grey[600]};
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
