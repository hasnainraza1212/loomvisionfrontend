import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Views/Login/Login';
import SignUp from './Views/SignUp/SignUp';
import Layout from './Views/Layout/Layout';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
