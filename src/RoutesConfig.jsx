import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from './Layout.jsx';
import Login from './pages/auth/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import DashboardRoutes from './pages/dashboard/DashboardRoutes.jsx';
import Register from './pages/auth/Register.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import ForgotPasswordUpdate from './pages/auth/ForgotPasswordUpdate.jsx';

const RoutesConfig = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<Layout />}>
          <Route
            index
            element={<Login />}
          />
          <Route
            path='/register'
            element={<Register />}
          />
          <Route
            path='/forgot-password'
            element={<ForgotPassword />}
          />
          <Route
            path='/forgot-password/:token'
            element={<ForgotPasswordUpdate />}
          />
          <Route
            path='/dashboard/*'
            element={<DashboardRoutes />}
          />

          <Route
            path='*'
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesConfig;
