import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Dashboard from './pages/Dashboard';
import Video from './pages/Video';
import AddPerson from './pages/AddPerson';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="video" element={<Video />} />
            <Route path="add/person" element={<AddPerson />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

