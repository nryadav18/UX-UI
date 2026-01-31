import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProductListPage from './pages/ProductListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

// ... (existing imports)

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  React.useEffect(() => {
    // ... (existing code)
  }, []);

  return (
    <Router>
      <div className="App min-h-screen text-white">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/cart" element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          } />
          <Route path="/orders" element={
            <PrivateRoute>
              <OrderHistoryPage />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
