import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import { format } from 'date-fns';
import { data } from './Data';
import { useWindowSize } from '../../../../../../../hooks/useWindowSize';

const MainChart = () => {
  const [series, setSeries] = useState([]);
  const { width } = useWindowSize();
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
        enabled: true,
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
      enabled: width > 768 ? true : false,
      formatter: function (val) {
        return Math.round(val); // Round the value to the nearest whole number
      },
    },
    colors: ['#5cb85c', '#000', '#0961ad'],
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Average High & Low Temperature',
      align: 'left',
    },

    xaxis: {
      type: 'category',
      title: {
        text: 'Time',
      },
      tickAmount:
        // width bigger than 768px than 10 if screen is bigger than 920px than 20
        width > 768 ? (width > 920 ? 20 : 8) : 5,

      labels: {
        formatter: function (val) {
          return val;
        },
      },
    },
    yaxis: {
      title: {
        text: 'Moisture',
      },
      labels: {
        formatter: function (val) {
          return Math.round(val);
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return Math.round(val);
        },
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
  };

  return (
    <div id='chart'>
      <ApexCharts
        options={options}
        series={series}
        type='line'
        height={350}
      />
    </div>
  );
};

export default MainChart;
