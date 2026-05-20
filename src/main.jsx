import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import AssignmentPage from './AssignmentPage.jsx';
import SyllabusPage from './SyllabusPage.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/assignment/:week" element={<AssignmentPage />} />
        <Route path="/syllabus" element={<SyllabusPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
