import { Route, Routes } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import Home from './pages/home/Home';
import History from './pages/history/History';
import Charts from './pages/charts/Charts';
import Messages from './pages/messages/Messages';

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
          path='charts'
          element={<Charts />}
        />
        <Route
          path='history'
          element={<History />}
        />
        <Route
          path='messages'
          element={<Messages />}
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
