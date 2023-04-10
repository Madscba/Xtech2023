import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Dashboard from './pages/Dashboard';
import CreateSubmission from './pages/CreateSubmission';
import AddPerson from './pages/AddPerson';
import Feedback from './pages/Feedback';
import Feedbacks from './pages/Feedbacks';
import Person from './pages/Person';
import AllPeople from './pages/AllPeople';
import Material from './pages/Material';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route index element={<Home/>} />
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="create/submission" element={<CreateSubmission />} />
            <Route path="add/person" element={<AddPerson />} />
            <Route path="person/:id" element={<Person />} />
            <Route path="people" element={<AllPeople />} />
            <Route path="material" element={<Material />} />
            <Route path="feedback/:id" element={<Feedback />} />
            <Route path="feedbacks" element={<Feedbacks />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

