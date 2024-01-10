import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOperatorStateValues } from '../../../../../features/user/userOperatorSlice';
import CardWrapper from '../../../../../styles/wrappers/CardWrapper';
import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

const NewOperatorDialog = () => {
  const { openDialog, firstName, lastName, email, password, isLoading } =
    useSelector((state) => state.operators);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(getUserOperatorStateValues({ name: 'openDialog', value: false }));
  };

  return (
    <Wrapper>
      <Dialog
        open={openDialog}
        onClose={handleClose}></Dialog>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

export default NewOperatorDialog;
