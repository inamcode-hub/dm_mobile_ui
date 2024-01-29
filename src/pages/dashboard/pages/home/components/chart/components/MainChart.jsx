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

const MainChart = () => {
  const [chartData, setChartData] = useState([]);
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  useEffect(() => {
    const formattedData = data.map((item) => ({
      ...item,
      inlet: item.inlet.toString().slice(0, 2),
      outlet: item.outlet.toString().slice(0, 2),
      rate: item.rate.toString().slice(0, 1),
      target: item.target.toString().slice(0, 2),

      createdAt: format(new Date(item.createdAt), 'EEE hh:mm'), // Format date using date-fns
    }));
    setChartData(formattedData);
  }, []);

  // Calculate the max and min values for the Y-axis
  const maxYValue = Math.max(
    ...data.map((item) =>
      Math.max(item.inlet, item.outlet, item.rate, item.target)
    )
  );
  const minYValue = Math.min(
    ...data.map((item) =>
      Math.min(item.inlet, item.outlet, item.rate, item.target)
    )
  );

  return (
    <ResponsiveContainer
      width='100%'
      height={400}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='createdAt' />
        <YAxis domain={[minYValue, maxYValue]} />
        <Tooltip formatter={(value, name) => [value, name]} />
        <Legend />
        <Line
          type='monotone'
          dataKey='inlet'
          stroke='#5cb85c'
          dot={false}
          label={isMobile ? false : { position: 'top' }}
        />

        <Line
          type='monotone'
          dataKey='target'
          stroke='#333'
          dot={false}
          label={isMobile ? false : { position: 'top' }}
        />
        <Line
          type='monotone'
          dataKey='outlet'
          stroke='#428bca'
          dot={false}
          label={isMobile ? false : { position: 'top' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MainChart;
