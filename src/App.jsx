import React from 'react';
// Changed from BrowserRouter to HashRouter
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Guide from './pages/Guide';
import Control from './pages/Control';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-hive-black text-hive-text flex flex-col">
        {/* The Navbar stays here forever */}
        <Navbar />
        
        {/* The page content changes here */}
        <main className="grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/control" element={<Control />} />
            
            {/* 404 Catch-All */}
            <Route path="*" element={
              <div className="text-center mt-20 text-hive-yellow">
                <h2 className="text-3xl font-bold">404 - Sector Not Found</h2>
                <p className="mt-4 text-hive-text">The requested data stream does not exist in The Hive.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}