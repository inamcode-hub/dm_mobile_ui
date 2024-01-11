import styled from '@emotion/styled';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserOperatorStateValues,
  operatorsDeleteThunk,
} from '../../../../../../features/user/userOperatorSlice';

const DeleteOperatorDialog = () => {
  const { showDeleteDialog, deleteName, deleteId } = useSelector(
    (state) => state.operators
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(
      getUserOperatorStateValues({ name: 'showDeleteDialog', value: false })
    );
  };
  const handleDelete = () => {
    dispatch(operatorsDeleteThunk(deleteId));
  };
  return (
    <Wrapper>
      <Dialog
        open={showDeleteDialog}
        onClose={handleClose}>
        <DialogTitle>
          <strong>Delete Operator</strong>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{deleteName}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant='outlined'>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant='contained'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default DeleteOperatorDialog;
