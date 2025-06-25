import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { format } from 'date-fns';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useWindowSize } from '../../../../../../../hooks/useWindowSize';
import { useSelector } from 'react-redux';

const ChartData = () => {
  const { width } = useWindowSize();
  const theme = useTheme();
  const { streamPayload } = useSelector((state) => state.home);
  const data = streamPayload?.chart?.data || [];

  const [series, setSeries] = useState([]);
  const [series2, setSeries2] = useState([]);

  const [options, setOptions] = useState({
    chart: {
      id: 'chart1',
      group: 'social',
      type: 'line',
      height: 350,
      stacked: false,
      toolbar: { show: true },
      zoom: { enabled: false },
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },
    colors: ['#5cb85c', '#070211', '#0961ad'],
    stroke: { curve: 'smooth' },
    title: {
      text: 'Average High & Low Moisture (Last 4 Hours)',
      align: 'left',
    },
    xaxis: {
      type: 'category',
      tickAmount: width > 768 ? (width > 920 ? 15 : 8) : 7,
      labels: {
        style: { colors: '#000' },
        formatter: (val) => val,
        rotate: 0,
      },
    },
  });

  const [options2, setOptions2] = useState({
    chart: {
      id: 'chart2',
      group: 'social',
      type: 'line',
      height: 300,
      toolbar: { show: false },
      zoom: { enabled: true },
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },
    colors: ['#f0ad4e'],
    stroke: { curve: 'smooth' },
    title: { text: 'Average High & Low Rate (Last 4 Hours)', align: 'left' },
    xaxis: {
      type: 'category',
      tickAmount: width > 768 ? (width > 920 ? 15 : 8) : 7,
      labels: {
        formatter: (val) => val,
        rotate: 0, // <-- forces horizontal text
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
    },
  });

  // ✅ Update series when data arrives (Last 4 hours only)
  useEffect(() => {
    if (!data?.length) return;

    const formatSeries = (key) =>
      data.map((item) => ({
        // Local time conversion happens automatically with JS Date
        x: item?.createdAt
          ? format(new Date(item.createdAt), 'EEE hh:mm aa') // this uses browser time
          : '',

        y: item?.[key] != null ? Number(item[key]).toFixed(2) : null, // allow null for gaps
      }));

    setSeries([
      { name: 'inlet', data: formatSeries('inlet') },
      { name: 'target', data: formatSeries('target') },
      { name: 'outlet', data: formatSeries('outlet') },
    ]);

    setSeries2([{ name: 'rate', data: formatSeries('rate') }]);
  }, [data]);

  return (
    <Wrapper theme={theme}>
      <div id="chart-line" className="chart-line">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={options.chart.height}
        />
      </div>
      <div id="chart-line2" className="chart-line2">
        <ReactApexChart
          options={options2}
          series={series2}
          type="line"
          height={options2.chart.height}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  overflow: hidden;
  margin-bottom: 1rem;

  .apexcharts-toolbar {
    margin-right: 1rem;
  }

  .apexcharts-title-text,
  .apexcharts-xaxis-label,
  .apexcharts-yaxis-label,
  .apexcharts-legend-text {
    fill: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#fff' : '#000'} !important;
    color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#fff' : '#000'} !important;
    text-transform: capitalize;
  }

  .apexcharts-tooltip,
  .apexcharts-tooltip-title {
    background: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#333' : '#fff'} !important;
    color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#fff' : '#000'} !important;
  }

  .chart-line,
  .chart-line2 {
    overflow: hidden;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: ${({ theme }) =>
      theme.palette.mode === 'dark' ? '#000' : '#fff'};
    margin: 0 1rem;
  }
`;

export default ChartData;
