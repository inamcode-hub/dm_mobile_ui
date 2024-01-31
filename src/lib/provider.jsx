import { Provider as ReduxProvider } from 'react-redux';
import Store from '../store';
import ThemeChecker from '../components/ThemeChecker';

const Provider = ({ children }) => {
  <ThemeChecker />;
  return <ReduxProvider store={Store}>{children}</ReduxProvider>;
};

export default Provider;
