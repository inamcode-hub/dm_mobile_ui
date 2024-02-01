import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { data } from './Data';

const ApexChart = () => {
  // Prepare your data
  const seriesInlet = data.map((item) => {
    return {
      x: new Date(item.createdAt).getTime(),
      y: item.inlet.toFixed(0),
    };
  });

  const seriesOutlet = data.map((item) => {
    return {
      x: new Date(item.createdAt).getTime(),
      y: item.outlet.toFixed(0),
    };
  });

  const seriesTarget = data.map((item) => {
    return {
      x: new Date(item.createdAt).getTime(),
      y: item.target.toFixed(0),
    };
  });

  const seriesRate = data.map((item) => {
    return {
      x: new Date(item.createdAt).getTime(),
      y: item.rate.toFixed(0),
    };
  });

  const [options, setOptions] = useState({
    chart: {
      id: 'chart1',
      group: 'social',
      type: 'line',
      height: 300,
    },
    colors: ['#008FFB', '#546E7A', '#00E396'],
  });

  const [series, setSeries] = useState([
    {
      name: 'inlet',
      data: seriesInlet,
    },
    {
      name: 'outlet',
      data: seriesOutlet,
    },
    {
      name: 'target',
      data: seriesTarget,
    },
  ]);

  const [options2, setOptions2] = useState({
    chart: {
      id: 'chart2',
      group: 'social',
      type: 'line',
      height: 300,
    },
    colors: ['#546E7A'],
  });

  const [series2, setSeries2] = useState([
    {
      name: 'rate',
      data: seriesRate,
    },
  ]);

  return (
    <div>
      <div id='chart-line'>
        <ReactApexChart
          options={options}
          series={series}
          type='line'
          height={300}
        />
      </div>
      <div id='chart-line2'>
        <ReactApexChart
          options={options2}
          series={series2}
          type='line'
          height={300}
        />
      </div>
    </div>
  );
};

export default ApexChart;
