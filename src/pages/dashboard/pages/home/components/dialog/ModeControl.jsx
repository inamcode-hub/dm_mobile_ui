import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Drawer,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { getHomeStateValues } from '../../../../../../features/home/homeSlice';
import styled from '@emotion/styled';
import { GrSystem } from 'react-icons/gr';
import { grey } from '@mui/material/colors';

const ModeControl = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { modeControlDialog, modeControl } = useSelector((state) => state.home);
  const [mode, setMode] = React.useState('local');
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const currentMode = 'local';
  const automaticReady = false;
  const handleClose = () => {
    dispatch(getHomeStateValues({ name: 'modeControlDialog', value: false }));
  };

  const handleSubmit = () => {
    // Dispatch action to update the mode here
    handleClose(); // Close drawer after submitting
  };

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setMode(newAlignment);
    }
  };
  useEffect(() => {
    setMode(modeControl);
  }, [modeControl]);
  return (
    <Drawer
      anchor='right'
      open={modeControlDialog}
      onClose={handleClose}
      variant='temporary'
      sx={{
        '& .MuiDrawer-paper': { width: fullScreen ? '100%' : '500px' },
      }}>
      <Wrapper>
        <div className='heading'>
          <div className='title'>
            <GrSystem />
            Change Mode
          </div>
          <div className='content'>
            Select the desired operational mode for the system.
          </div>
        </div>
        <div className='body'>
          <div className='information'>
            <div className='current_value'>
              Currently you are in <span>{currentMode}</span> mode.
            </div>
          </div>
          <ToggleButtonGroup
            color='primary'
            value={mode}
            exclusive
            onChange={handleAlignment}
            fullWidth>
            <ToggleButton
              value='automatic'
              disabled={!automaticReady || mode === 'automatic'}
              className={mode === 'automatic' ? 'active' : ''}>
              Automatic
            </ToggleButton>
            <ToggleButton
              value='manual'
              disabled={mode === 'manual'}
              className={mode === 'manual' ? 'active' : ''}>
              Manual
            </ToggleButton>

            <ToggleButton
              value='local'
              disabled={mode === 'local'}
              className={mode === 'local' ? 'active' : ''}>
              Local
            </ToggleButton>
          </ToggleButtonGroup>
          {!automaticReady && (
            <div className='info'>
              The dryer is currently calibrating to your specific conditions.
              Automatic mode will be available shortly after initial learning is
              complete.
            </div>
          )}
        </div>
        <div className='footer'>
          <Button
            onClick={handleClose}
            color='primary'
            variant='outlined'>
            Discard Changes
          </Button>
          <Button
            onClick={handleSubmit}
            color='primary'
            variant='contained'
            disabled={!mode}>
            Update Mode
          </Button>
        </div>
      </Wrapper>
    </Drawer>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;

  .heading {
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 20px;

    .title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 10px;

      svg {
        font-size: 2rem;
        // icon color
        color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main};
      }
    }

    .content {
      font-size: 16px;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? grey[300] : grey[600]};
    }
  }

  .body {
    .current_value {
      font-size: 16px;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? grey[300] : grey[600]};
      margin-bottom: 20px;

      span {
        font-weight: bold;
        color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main};
        text-transform: capitalize;
        margin-left: 5px;
        margin-right: 5px;
      }
    }

    .MuiTextField-root {
      margin-top: 10px;
    }
    .info {
      font-size: 16px;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? grey[300] : grey[600]};
      margin: 20px 0;
      border: 1px solid #e0e0e0;
      padding: 10px;
      border-radius: 8px;
      //info
      background-color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? '#333' : '#f9f9f9'};
    }
    .active {
      background-color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? grey[900] : grey[200]};
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main};
    }
  }

  .footer {
    display: grid;
    grid-template-columns: 1fr 1fr;

    gap: 10px;
    margin-top: 20px;

    .MuiButton-root {
      font-size: 14px;
    }
  }
`;

export default ModeControl;
