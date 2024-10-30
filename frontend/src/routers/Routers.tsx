import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from '../pages/SignIn';
import Home from '../pages/Home';
import { useAppSelector } from '../helpers/CostumHook';
import SignIn from '../pages/admin/SignIn';
import Dashboard from '../pages/admin/Dashboard';





const Routers: React.FC = () => {
  const { userName } = useAppSelector((state) => state.user);
  return (
    <Routes>
      <Route path="/" element={userName ? <Navigate to="/home" replace /> : <SignUp />} />
      <Route path="/home" element={userName ? <Home /> : <Navigate to="/" />} />
      <Route path="/admin" element={<SignIn />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
};

export default Routers;
