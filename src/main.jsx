import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import AssignmentPage from './AssignmentPage.jsx';
import SyllabusPage from './SyllabusPage.jsx';
import Week01Overview from './pages/Week01Overview.jsx';
import Week01TopicDetail from './pages/Week01TopicDetail.jsx';
import Week02Overview from './pages/Week02Overview.jsx';
import Week02TopicDetail from './pages/Week02TopicDetail.jsx';
import Week03Overview from './pages/Week03Overview.jsx';
import Week03TopicDetail from './pages/Week03TopicDetail.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/assignment/:week" element={<AssignmentPage />} />
        <Route path="/syllabus" element={<SyllabusPage />} />
        <Route path="/week/01" element={<Week01Overview />} />
        <Route path="/week/01/:topicKey" element={<Week01TopicDetail />} />
        <Route path="/week/02" element={<Week02Overview />} />
        <Route path="/week/02/:topicKey" element={<Week02TopicDetail />} />
        <Route path="/week/03" element={<Week03Overview />} />
        <Route path="/week/03/:topicKey" element={<Week03TopicDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
