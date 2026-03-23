// client/src/App.js
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import PricingPage from './pages/PricingPage';
import ImpactPage from './pages/ImpactPage';
import SignupPage from './pages/SignupPage';
import CompetitorAnalysisPage from './pages/CompetitorAnalysisPage';
import CampaignPage from './pages/CampaignPage';
import AuthPage from './pages/AuthPage';

export default function App() {
  const [page, setPage] = useState('landing');
  const [dark, setDark] = useState(() => localStorage.getItem('dark') === 'true');

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('dark', dark);
  }, [dark]);

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (page) {
      case 'landing':    return <LandingPage navigate={navigate} />;
      case 'dashboard':  return <Dashboard navigate={navigate} dark={dark} />;
      case 'pricing':    return <PricingPage navigate={navigate} />;
      case 'impact':     return <ImpactPage navigate={navigate} />;
      case 'signup':     return <SignupPage navigate={navigate} />;
      case 'competitor': return <CompetitorAnalysisPage navigate={navigate} />;
      case 'campaign':   return <CampaignPage navigate={navigate} />;
      case 'auth':       return <AuthPage navigate={navigate} initialMode="signin" />;
      case 'signin':     return <AuthPage navigate={navigate} initialMode="signin" />;
      case 'register':   return <AuthPage navigate={navigate} initialMode="signup" />;
      default:           return <LandingPage navigate={navigate} />;
    }
  };

  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: dark ? '#F5EFD8' : '#0F0F12',
            color: dark ? '#0F0F12' : '#F5EFD8',
            borderRadius: '14px',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: '13px',
            padding: '10px 18px',
          },
          success: { iconTheme: { primary: '#8BB09A', secondary: dark ? '#0F0F12' : '#F5EFD8' } },
        }}
      />
      <Navbar dark={dark} toggleDark={() => setDark(d => !d)} navigate={navigate} page={page} />
      {renderPage()}
    </>
  );
}