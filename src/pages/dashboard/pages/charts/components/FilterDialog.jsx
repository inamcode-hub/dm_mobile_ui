import * as React from 'react';
import { Button, Drawer, useTheme, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegChartBar } from 'react-icons/fa';
import styled from '@emotion/styled';
import SpeedIcon from '@mui/icons-material/Speed';
import { getChartStateValues } from '../../../../../features/chart/chartSlice';
const FilterDialog = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { showFilterDialog } = useSelector((state) => state.chart);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    dispatch(getChartStateValues({ name: 'showFilterDialog', value: false }));
  };

  const handleSubmit = () => {
    // Dispatch action to update the rate set point here
    handleClose(); // Close drawer after submitting
  };

  return (
    <Drawer
      anchor='right'
      open={showFilterDialog}
      onClose={handleClose}
      variant='temporary'
      sx={{
        '& .MuiDrawer-paper': { width: fullScreen ? '100%' : '500px' },
      }}>
      <Wrapper>
        <div className='heading'>
          <div className='title'>
            <FaRegChartBar />
            Filter Chart
          </div>
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
            variant='contained'>
            Apply Filter
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
  }

  .footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`;

export default FilterDialog;
