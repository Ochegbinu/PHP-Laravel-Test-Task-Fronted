
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/auth/Login'; 
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import BRTList from './components/brt/BrtList';
import BRTCreate from './components/brt/CreateBrt';
import BRTEdit from './components/brt/BRTEdit';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <div className="min-h-screen bg-gray-100">
            <NavBar />
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                      <Dashboard />
                  }
                />
                <Route
                  path="/brts"
                  element={
                    // <PrivateRoute>
                      <BRTList />
                    // </PrivateRoute>
                  }
                />
                <Route
                  path="/brts/create"
                  element={
                    // <PrivateRoute>
                      <BRTCreate />
                    // </PrivateRoute>
                  }
                />
                <Route
                  path="/brts/edit/:id"
                  element={
                    <PrivateRoute>
                      <BRTEdit />
                    </PrivateRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
            <ToastContainer />
          </div>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;