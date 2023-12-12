import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './Context/UserProvider';
import Auth from './components/Auth';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import Navbar from './components/Navbar';
import Public from './components/public';
import SurfboardDetails from './components/surfboardDetail';

function App() {
  const { token, logout, boards } = useContext(UserContext);
  return (
    <>
      <Navbar logout={logout} token={token} />
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/profile" /> : <Auth />}
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <Profile />
            </ProtectedRoute>
          }
        />
        {/* <Route path={`/surfboard/${_id}`} to={<SurfboardDetails />} /> */}
        <Route path="/public" element={<Public />} />
        <Route
          path="/surfboard/:id"
          element={<SurfboardDetails boards={boards} />}
        />
      </Routes>
    </>
  );
}

export default App;
