import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { data } from './Data';
import { useWindowSize } from '../../../../../../../hooks/useWindowSize';
import styled from '@emotion/styled';

const ControlChart = () => {
  const [chartData, setChartData] = useState([]);
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  useEffect(() => {
    const formattedData = data.map((item) => ({
      ...item,
      rate: Math.round(item.rate),
      createdAt: format(new Date(item.createdAt), 'EEE hh:mm'), // Format date using date-fns
    }));
    setChartData(formattedData);
  }, []);

  const tickFormatter = (tickItem) => {
    return Math.round(tickItem);
  };

  return (
    <Wrapper>
      <div className='heading'>
        DryerMaster Performance Overview <span>(4-5 Hours)</span>
      </div>
      <ResponsiveContainer
        width='100%'
        height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
          <XAxis dataKey='createdAt' />
          <YAxis tickFormatter={tickFormatter} />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip
            formatter={(value, name) => [value, name]}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Legend
            verticalAlign='top'
            align='right'
            iconType='wye'
            wrapperStyle={{ top: 0 }}
            formatter={(value) => {
              return (
                <span style={{}}>
                  {value === 'rate' ? 'Rate control' : 'Temperature'}
                </span>
              );
            }}
          />
          <Line
            type='monotone'
            dataKey='rate'
            stroke='#f0ad4e'
            dot={false}
            label={isMobile ? false : { position: 'top' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? '#000000' : '#ffffff'};
  @media (min-width: 768px) {
    margin: 0 1rem;
  }

  .heading {
    font-size: 1.1rem;
    font-weight: 500;

    padding: 0 1rem;
    span {
      font-size: 0.9rem;
      font-weight: 400;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? '#ffffff' : '#000000'};
    }
  }
`;
export default ControlChart;
