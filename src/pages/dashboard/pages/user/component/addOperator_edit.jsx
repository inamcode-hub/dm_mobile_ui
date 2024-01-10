import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserOperatorStateValues,
  operatorsEditThunk,
  operatorsRegisterThunk,
} from '../../../../../features/user/userOperatorSlice';
import styled from '@emotion/styled';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Typography,
} from '@mui/material';

const initialState = {
  passwordError: false,
};
const EditOperatorDialog = () => {
  const {
    openEditDialog,
    firstName,
    lastName,
    email,
    password,
    isLoadingEdit,
  } = useSelector((state) => state.operators);
  const dispatch = useDispatch();
  const [state, setState] = React.useState(initialState);

  const handleClose = () => {
    dispatch(
      getUserOperatorStateValues({ name: 'openEditDialog', value: false })
    );
    dispatch(getUserOperatorStateValues({ name: 'operatorId', value: '' }));
    dispatch(getUserOperatorStateValues({ name: 'firstName', value: '' }));
    dispatch(getUserOperatorStateValues({ name: 'lastName', value: '' }));
    dispatch(getUserOperatorStateValues({ name: 'email', value: '' }));
    dispatch(getUserOperatorStateValues({ name: 'password', value: '' }));
  };

  const handleChange = (e) => {
    dispatch(
      getUserOperatorStateValues({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length > 0 && password.length < 8) {
      setState({ ...state, passwordError: true });
      return;
    }
    dispatch(operatorsEditThunk());
  };

  return (
    <Wrapper>
      <Dialog
        open={openEditDialog}
        onClose={handleClose}>
        <DialogTitle>Edit Operator</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to edit an operator.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin='dense'
              name='firstName'
              label='First Name'
              type='text'
              fullWidth
              required
              value={firstName}
              onChange={handleChange}
            />
            <TextField
              margin='dense'
              name='lastName'
              label='Last Name'
              type='text'
              fullWidth
              required
              value={lastName}
              onChange={handleChange}
            />
            <TextField
              margin='dense'
              name='email'
              label='Email Address'
              type='email'
              fullWidth
              required
              value={email}
              onChange={handleChange}
            />
            <TextField
              margin='dense'
              name='password'
              label='New Password'
              type='text'
              fullWidth
              value={password}
              onChange={handleChange}
            />

            {state.passwordError && (
              <Typography color='error'>
                Password must be at least 8 characters
              </Typography>
            )}
            <DialogActions>
              <Button
                onClick={handleClose}
                variant='outlined'>
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'>
                {isLoadingEdit ? <CircularProgress size={24} /> : 'Update'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default EditOperatorDialog;
