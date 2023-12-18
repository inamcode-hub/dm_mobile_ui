import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';
import SpeedIcon from '@mui/icons-material/Speed';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const DmReconnect = () => {
  return (
    <Wrapper>
      <div className='body'>
        <Typography
          variant='h4'
          component='h2'>
          <WifiOffIcon sx={{ fontSize: 35, marginRight: '.5rem' }} />
          Connection Issue
        </Typography>
        <Typography variant='body1'>
          We&apos;re having trouble connecting to your DryerMaster device.
          Please check the following:
        </Typography>
        <ul>
          <li>
            <WifiIcon sx={{ verticalAlign: 'middle', marginRight: '.5rem' }} />
            Ensure your WiFi is on and connected to the internet.
          </li>
          <li>
            <SpeedIcon sx={{ verticalAlign: 'middle', marginRight: '.5rem' }} />
            Check if your internet connection is stable and strong.
          </li>
          <li>
            <RestartAltIcon
              sx={{ verticalAlign: 'middle', marginRight: '.5rem' }}
            />
            Restart your DryerMaster device and router if necessary.
          </li>
          <li>
            <ContactSupportIcon
              sx={{ verticalAlign: 'middle', marginRight: '.5rem' }}
            />
            If your connection issues persist, please contact our support team
            for assistance.
          </li>
        </ul>
        <Button
          variant='contained'
          size='large'
          startIcon={<AutorenewIcon />}>
          Reconnect
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  margin: 1rem;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows[2]};
  background-color: ${({ theme }) => theme.palette.background.paper};
  max-width: 600px;
  @media (min-width: 600px) {
    margin: 3rem auto;
  }
  h2 {
    font-weight: 500;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.palette.error.main};
  }
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
    }
  }
`;

export default DmReconnect;
