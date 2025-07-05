import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { testSupabaseConnection } from './lib/supabase';
import Header from './components/Layout/Header';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Skills from './components/Sections/Skills';
import Projects from './components/Sections/Projects';
import Certifications from './components/Sections/Certifications';
import Contact from './components/Sections/Contact';
import Footer from './components/Layout/Footer';

function App() {
  useEffect(() => {
    // Test Supabase connection on app load
    testSupabaseConnection().then(connected => {
      if (connected) {
        console.log('✅ Supabase connection verified');
      } else {
        console.error('❌ Supabase connection failed');
      }
    });
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Certifications />
            <Contact />
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#fff',
                borderRadius: '12px',
              },
            }}
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;