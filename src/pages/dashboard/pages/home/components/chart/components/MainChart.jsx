import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { format } from 'date-fns';
import { data } from './Data';
import { useWindowSize } from '../../../../../../../hooks/useWindowSize';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

const MainChart = () => {
  const [series, setSeries] = useState([]);
  const { width } = useWindowSize();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    const formattedData = data.map((item) => ({
      x: format(new Date(item.createdAt), 'EEE hh:mm'),
      y: [item.inlet, item.target, item.outlet],
    }));

    setSeries([
      {
        name: 'Inlet',
        data: formattedData.map((item) => ({ x: item.x, y: item.y[0] })),
      },
      {
        name: 'Target',
        data: formattedData.map((item) => ({ x: item.x, y: item.y[1] })),
      },
      {
        name: 'Outlet',
        data: formattedData.map((item) => ({ x: item.x, y: item.y[2] })),
      },
    ]);
  }, []);

  const options = {
    chart: {
      type: 'line',
      height: 350,
      stacked: false,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: false,
      },

      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },

    dataLabels: {
      enabled: width > 920 ? true : false,
      formatter: function (val) {
        return Math.round(val); // Round the value to the nearest whole number
      },
    },
    colors: isDarkMode
      ? ['#5cb85c', '#353535', '#0961ad']
      : ['#5cb85c', '#000', '#0961ad'],
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Average High & Low Temperature',
      align: 'left',
      style: {
        color: isDarkMode ? '#fff' : '#000', // Change title color based on theme
      },
    },

    xaxis: {
      type: 'category',

      tickAmount:
        // width bigger than 768px than 10 if screen is bigger than 920px than 20
        width > 768 ? (width > 920 ? 15 : 8) : 7,

      labels: {
        style: {
          colors: isDarkMode ? '#fff' : '#000',
        },
        formatter: function (val) {
          return val;
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDarkMode ? '#fff' : '#000',
        },
        formatter: function (val) {
          return Math.round(val);
        },
      },
    },
    tooltip: {
      theme: isDarkMode ? 'dark' : 'light',
      y: {
        formatter: function (val) {
          return Math.round(val);
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: {
        colors: isDarkMode ? '#fff' : '#000', // Change text color based on theme
      },
    },
  };

  return (
    <Wrapper>
      <div id='chart'>
        <ApexCharts
          options={options}
          series={series}
          type='line'
          height={350}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
  #chart {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    margin: 0 1rem;
    border-radius: 10px;
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#000' : '#fff'};
  }
`;

export default MainChart;
