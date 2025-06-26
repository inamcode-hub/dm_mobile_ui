import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Drawer,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';
import { GrSystem } from 'react-icons/gr';
import { toast } from 'react-toastify';
import {
  getHomeStateValues,
  sendHomeMessage,
} from '../../../../../../features/home/homeSlice';
import { getStreamValueByName } from '../../../../../../lib/getStreamValueByName';

const ModeControl = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { modeControlDialog, streamPayload, connectionStatus } = useSelector(
    (state) => state.home
  );

  // Extract mode value safely from streamPayload
  const rawMode = getStreamValueByName(streamPayload, 'mode_control', 0);
  const modeValue = Number(rawMode); // Ensure it's numeric

  const [mode, setMode] = useState('');

  const getModeLabel = (value) => {
    const map = {
      10: 'local',
      11: 'manual',
      12: 'automatic',
    };
    return map[value] || '';
  };

  const getModeDisplay = (value) => {
    const map = {
      10: 'Local',
      11: 'Manual',
      12: 'Remote',
    };
    return map[value] || '- -';
  };

  useEffect(() => {
    // Set selected button to current mode
    const current = getModeLabel(modeValue);
    setMode(current);
  }, [modeValue]);

  const handleAlignment = (e, newAlignment) => {
    if (newAlignment !== null) {
      setMode(newAlignment);
    }
  };

  const handleClose = () => {
    dispatch(getHomeStateValues({ name: 'modeControlDialog', value: false }));
  };

  const handleSubmit = () => {
    if (!mode) return;

    const valueMap = {
      local: 'local_mode',
      manual: 'manual_mode',
      automatic: 'automatic_mode',
    };

    dispatch(
      sendHomeMessage({
        action: 'update_api',
        serial: connectionStatus?.serial,
        topic: 'home',
        domain: 'update_api',
        updates: [
          {
            path: 'mode',
            value: valueMap[mode],
          },
        ],
        reason: `Mode updated from UI to ${mode}`,
      })
    );

    toast.success(
      `Mode changed to ${
        mode.charAt(0).toUpperCase() + mode.slice(1)
      } successfully!`
    );

    // Close this drawer and optionally open setpoint for 'automatic'
    handleClose();

    if (mode === 'automatic') {
      dispatch(
        getHomeStateValues({ name: 'moistureSetPointDialog', value: true })
      );
      toast.info('Please set the Moisture Set Point now.');
    }
    if (mode === 'manual') {
      dispatch(getHomeStateValues({ name: 'rateSetPointDialog', value: true }));
      toast.info('Please set the Discharge Rate Set Point now.');
    }
  };

  return (
    <Drawer
      anchor="right"
      open={modeControlDialog}
      onClose={handleClose}
      variant="temporary"
      sx={{
        '& .MuiDrawer-paper': { width: fullScreen ? '100%' : '500px' },
      }}
    >
      <Wrapper>
        <div className="heading">
          <div className="title">
            <GrSystem /> Mode Control
          </div>
        </div>
        <div className="body">
          <div className="current_value">
            Currently you are in <span>{getModeDisplay(modeValue)}</span> mode.
          </div>
          <ToggleButtonGroup
            color="primary"
            value={mode}
            exclusive
            onChange={handleAlignment}
            fullWidth
          >
            <ToggleButton value="automatic" disabled={mode === 'automatic'}>
              Automatic
            </ToggleButton>
            <ToggleButton value="manual" disabled={mode === 'manual'}>
              Manual
            </ToggleButton>
            <ToggleButton value="local" disabled={mode === 'local'}>
              Local
            </ToggleButton>
          </ToggleButtonGroup>
          <div className="info">
            Automatic mode will be available after the system completes
            calibration.
          </div>
        </div>
        <div className="footer">
          <Button onClick={handleClose} color="primary" variant="outlined">
            Discard Changes
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={!mode}
          >
            Update Mode
          </Button>
        </div>
      </Wrapper>
    </Drawer>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;

  .heading {
    border-bottom: 1px solid #e0e0e0;

    .title {
      font-size: 2rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 10px;

      svg {
        font-size: 2rem;
        color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main};
      }
    }
  }

  .body {
    .current_value {
      font-size: 16px;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? grey[300] : grey[600]};
      margin: 1rem 0;
      span {
        font-weight: bold;
        color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main};
        text-transform: capitalize;
        margin-left: 5px;
        margin-right: 5px;
      }
    }

    .info {
      font-size: 16px;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? grey[300] : grey[600]};
      margin: 1rem 0;
      border: 1px solid #e0e0e0;
      padding: 10px;
      border-radius: 8px;
      background-color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? '#333' : '#f9f9f9'};
    }
  }

  .footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    .MuiButton-root {
      font-size: 14px;
    }
  }
`;

export default ModeControl;
