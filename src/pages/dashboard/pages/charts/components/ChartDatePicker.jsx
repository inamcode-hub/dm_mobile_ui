import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from '@emotion/styled';
import 'react-datepicker/dist/react-datepicker.css';
import { Divider, Typography } from '@mui/material';

const ChartDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  }, [startDate, endDate]);

  return (
    <Wrapper>
      <Divider>
        <Typography variant='subtitle2'>Date Range</Typography>
      </Divider>
      <div className='body'>
        <div className='date-picker-1'>
          <Typography variant='subtitle2'>Start Date:</Typography>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className='date-picker-2'>
          <Typography variant='subtitle2'>End Date:</Typography>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
      </div>
      <Divider />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .body {
    display: grid;

    .date-picker-1,
    .date-picker-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;

      @media (max-width: 768px) {
        display: grid;
        gap: 0rem;
      }
      .react-datepicker__input-container {
        input {
          padding: 0.5rem;
          border-radius: 5px;
          border: 1px solid #e0e0e0;
          outline: none;
          font-size: 1rem;
          width: 100%;
        }
      }
    }
  }
`;

export default ChartDatePicker;
