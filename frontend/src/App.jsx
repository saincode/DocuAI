import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';

function App() {
  const [page, setPage] = useState('landing');

  if (page === 'chat') {
    return <ChatInterface onBack={() => setPage('landing')} />;
  }

  return <LandingPage onGetStarted={() => setPage('chat')} />;
}

export default App;
