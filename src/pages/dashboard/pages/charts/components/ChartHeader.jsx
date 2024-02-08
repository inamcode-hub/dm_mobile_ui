import React from 'react';
import ChartHeaderDatePicker from './ChartHeaderDatePicker';
import { useDispatch } from 'react-redux';
import { getChartStateValues } from '../../../../../features/chart/chartSlice';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
const ChartHeader = () => {
  const dispatch = useDispatch();
  const handleFilterDialog = () => {
    dispatch(getChartStateValues({ name: 'showFilterDialog', value: true }));
    console.log('Filter Dialog');
  };
  return (
    <Wrapper>
      <Button
        variant='contained'
        color='primary'
        size='small'
        onClick={handleFilterDialog}
        startIcon={<FilterAltOutlinedIcon />}>
        Filter Chart
      </Button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding: 1rem;
`;
export default ChartHeader;
