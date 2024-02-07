import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeStateValues } from '../../../../../../features/home/homeSlice';

const DischargeRateSetPoint = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { rateSetPointDialog } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(getHomeStateValues({ name: 'rateSetPointDialog', value: false }));
  };

  return (
    <Wrapper>
      <Dialog
        fullScreen={fullScreen}
        open={rateSetPointDialog}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}>
            Disagree
          </Button>
          <Button
            onClick={handleClose}
            autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default DischargeRateSetPoint;
