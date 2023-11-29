import { Route, Routes } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import Home from './pages/home/Home';
import History from './pages/history/History';
import Settings from './pages/settings/Settings';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
        <Route
          index
          element={<Home />}
        />
        <Route
          path='history'
          element={<History />}
        />
        <Route
          path='settings'
          element={<Settings />}
        />
        <Route
          path='*'
          element={<h1>Not Found Dashboard</h1>}
        />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
