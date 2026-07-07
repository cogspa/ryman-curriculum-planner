import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginGate from './LoginGate.jsx';
import App from './App.jsx';
import AssignmentPage from './AssignmentPage.jsx';
import AssignmentsHubPage from './AssignmentsHubPage.jsx';
import CalendarPage from './CalendarPage.jsx';
import SyllabusPage from './SyllabusPage.jsx';
import Week01Overview from './pages/Week01Overview.jsx';
import Week01TopicDetail from './pages/Week01TopicDetail.jsx';
import Week01Videos from './pages/Week01Videos.jsx';
import Week01Shortcuts from './pages/Week01Shortcuts.jsx';
import Week02Overview from './pages/Week02Overview.jsx';
import Week02TopicDetail from './pages/Week02TopicDetail.jsx';
import NoiseVsPattern from './pages/NoiseVsPattern.jsx';
import NoiseLesson from './pages/NoiseLesson.jsx';
import DefinePresetsLesson from './pages/DefinePresetsLesson.jsx';
import BrushFoundry from './pages/brush-maker.jsx';
import NotanLightLab from './pages/NotanLightLab2.jsx';
import ValueStudiesCarousel from './pages/ValueStudiesCarousel.jsx';
import Week03Overview from './pages/Week03Overview.jsx';
import Week03TopicDetail from './pages/Week03TopicDetail.jsx';
import Week04Overview from './pages/Week04Overview.jsx';
import Week04TopicDetail from './pages/Week04TopicDetail.jsx';
import Week05Overview from './pages/Week05Overview.jsx';
import Week05TopicDetail from './pages/Week05TopicDetail.jsx';
import Week06Overview from './pages/Week06Overview.jsx';
import Week06TopicDetail from './pages/Week06TopicDetail.jsx';
import Week07Overview from './pages/Week07Overview.jsx';
import Week07TopicDetail from './pages/Week07TopicDetail.jsx';
import ClassFAQPage from './ClassFAQPage.jsx';
import SpeakerListPage from './SpeakerListPage.jsx';
import RosterPage from './RosterPage.jsx';
import MentorshipPage from './MentorshipPage.jsx';
import PixelBudget from './PixelBudget.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<LoginGate />}>
          <Route path="/" element={<App />} />
          <Route path="/assignment/:week" element={<AssignmentPage />} />
          <Route path="/assignments" element={<AssignmentsHubPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/syllabus" element={<SyllabusPage />} />
          <Route path="/faq" element={<ClassFAQPage />} />
          <Route path="/speakers" element={<SpeakerListPage />} />
          <Route path="/roster" element={<RosterPage />} />
          <Route path="/mentorship" element={<MentorshipPage />} />
          <Route path="/pixel-budget" element={<PixelBudget />} />
          <Route path="/week/01/pixel-budget" element={<PixelBudget />} />
          <Route path="/week/01" element={<Week01Overview />} />
          <Route path="/week/01/videos" element={<Week01Videos />} />
          <Route path="/week/01/shortcuts" element={<Week01Shortcuts />} />
          <Route path="/week/01/:topicKey" element={<Week01TopicDetail />} />
          <Route path="/week/02" element={<Week02Overview />} />
          <Route path="/week/02/define-presets" element={<DefinePresetsLesson />} />
          <Route path="/week/02/generating-noise-in-photoshop" element={<NoiseLesson />} />
          <Route path="/week/02/procedural-vs-non-procedural" element={<NoiseVsPattern />} />
          <Route path="/week/02/:topicKey" element={<Week02TopicDetail />} />
          <Route path="/week/03" element={<Week03Overview />} />
          <Route path="/week/03/brush-maker" element={<BrushFoundry />} />
          <Route path="/week/03/notan-light-lab" element={<NotanLightLab />} />
          <Route path="/week/03/value-studies" element={<ValueStudiesCarousel />} />
          <Route path="/week/03/:topicKey" element={<Week03TopicDetail />} />
          <Route path="/week/04" element={<Week04Overview />} />
          <Route path="/week/04/:topicKey" element={<Week04TopicDetail />} />
          <Route path="/week/05" element={<Week05Overview />} />
          <Route path="/week/05/:topicKey" element={<Week05TopicDetail />} />
          <Route path="/week/06" element={<Week06Overview />} />
          <Route path="/week/06/:topicKey" element={<Week06TopicDetail />} />
          <Route path="/week/07" element={<Week07Overview />} />
          <Route path="/week/07/:topicKey" element={<Week07TopicDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
