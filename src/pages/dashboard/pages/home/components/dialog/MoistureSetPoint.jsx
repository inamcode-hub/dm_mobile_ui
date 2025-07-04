import * as React from 'react';
import {
  Button,
  Drawer,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getHomeStateValues,
  sendHomeMessage,
} from '../../../../../../features/home/homeSlice';
import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';
import OpacityIcon from '@mui/icons-material/Opacity';
import { toast } from 'react-toastify';

import { getStreamValueByName } from '../../../../../../lib/getStreamValueByName';
const MoistureSetPoint = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [newMoistureSetPoint, setNewMoistureSetPoint] = React.useState('');
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { streamPayload, connectionStatus, moistureSetPointDialog } =
    useSelector((state) => state.home);
  const targetMoisture = getStreamValueByName(
    streamPayload,
    'moisture_setpoint'
  );

  const handleClose = () => {
    dispatch(
      getHomeStateValues({ name: 'moistureSetPointDialog', value: false })
    );
    setNewMoistureSetPoint('');
  };

  const handleSubmit = async () => {
    if (newMoistureSetPoint === '') {
      toast.error('Please enter a valid moisture set point!');
      return;
    }
    try {
      dispatch(
        sendHomeMessage({
          action: 'update_api',
          serial: connectionStatus?.serial,
          topic: 'home',
          domain: 'update_api',
          updates: [
            {
              path: 'moisture_setpoint',
              value: parseFloat(newMoistureSetPoint),
            },
          ],
          reason: 'Moisture set point updated from UI',
        })
      );
      toast.success('Moisture set point updated successfully!');
      // Optionally, you can close the dialog after submission
      handleClose();

      // handleClose();
    } catch (error) {
      toast.error('Failed to update moisture set point!');
    }
  };

  return (
    <Drawer
      anchor="right"
      open={moistureSetPointDialog}
      onClose={handleClose}
      variant="temporary"
      sx={{
        '& .MuiDrawer-paper': { width: fullScreen ? '100%' : '500px' },
      }}
    >
      <Wrapper>
        <div className="heading">
          <div className="title">
            <OpacityIcon />
            Moisture Set Point
          </div>
        </div>
        <div className="body">
          <div className="current_value">
            <span>Current Set Point:</span>
            <span>{targetMoisture}%</span>
          </div>
          <TextField
            fullWidth
            autoFocus
            margin="dense"
            id="moistureSetPoint"
            label="Desired Moisture Set Point"
            type="number"
            variant="outlined"
            className="text-field"
            value={newMoistureSetPoint}
            onChange={(e) => setNewMoistureSetPoint(e.target.value)}
          />
          <div className="content">
            Enter the moisture set point, our dryer fine-tunes its settings to
            match your product&apos;s moisture to this value.
          </div>
        </div>
        <div className="footer">
          <Button onClick={handleClose} color="primary" variant="outlined">
            Discard Changes
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Update Set Point
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
  min-height: 100%;

  .heading {
    border-bottom: 1px solid #e0e0e0;
    .title {
      font-size: 2rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 10px;
      svg {
        font-size: 2.5rem;
        // icon color
        color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main};
      }
    }
  }

  .body {
    .current_value {
      font-size: 16px;
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span:first-of-type {
        font-weight: bold;
      }
    }

    .content {
      font-size: 16px;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? grey[300] : grey[600]};
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
  }

  .footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`;

export default MoistureSetPoint;
