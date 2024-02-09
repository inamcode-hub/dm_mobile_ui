import React from 'react';
import ChartData from './components/ChartData';
import ChartHeader from './components/ChartHeader';
import FilterDialog from './components/FilterDialog';
import ChartPagination from './components/ChartPagination';
import styled from '@emotion/styled';

const History = () => {
  return (
    <Wrapper>
      <FilterDialog />
      <div className='filter-pagination'>
        <ChartHeader />
        <ChartPagination />
      </div>
      <ChartData />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .filter-pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    position: fixed;
    width: 100%;
    background-color: white;
  }
`;
export default History;
