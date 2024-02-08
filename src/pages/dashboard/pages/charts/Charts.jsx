import ChartHeader from './components/ChartHeader';
import ChartData from './components/ChartData';
import FilterDialog from './components/FilterDialog';

const Charts = () => {
  return (
    <div>
      <FilterDialog />
      <ChartHeader />
      <ChartData />
    </div>
  );
};

export default Charts;
