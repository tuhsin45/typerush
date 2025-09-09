import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './components/Auth';
import Header from './components/Header';
import TypingTest from './components/TypingTest';
import './index.css';

function AppContent() {
  const { user, login, register, logout, loading } = useAuth();

  useEffect(() => {
    if (user && user.highestWPM > 0) {
      document.title = `TypeRush - Best: ${user.highestWPM} WPM`;
    } else {
      document.title = 'TypeRush - Typing Speed Test';
    }
  }, [user]);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--primary-bg) 0%, var(--bg-secondary) 100%)'
      }}>
        <div className="animate-pulse" style={{ 
          fontSize: '1.125rem', 
          color: 'var(--text-secondary)' 
        }}>
          Loading TypeRush...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={login} onRegister={register} />;
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--primary-bg) 0%, var(--bg-secondary) 100%)'
    }}>
      <Header user={user} onLogout={logout} />
      <main className="container" style={{ paddingTop: 'var(--space-xl)' }}>
        <TypingTest />
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
