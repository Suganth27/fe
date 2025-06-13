import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClientDashboard from './components/ClientDashboard';
import MailMessaging from './components/MailMessaging';
import Login from './components/Login';
import FamilyPage from './components/FamilyPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logs" element={<ClientDashboard />} />
        <Route path="/clients" element={<ClientDashboard />} />
        <Route path="/client-details" element={<ClientDashboard />} />
        <Route path="/" element={<ClientDashboard />} />
        <Route path="/mail-messaging" element={<MailMessaging />} />
        <Route path="/family" element={<FamilyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
