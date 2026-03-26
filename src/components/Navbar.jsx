import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hexagon as HexIcon, LayoutDashboard, Settings, BookOpen, Cpu } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-hive-brown border-b-2 border-hive-gold px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
      
      {/* Logo Section */}
      <div className="text-2xl font-bold text-hive-yellow tracking-widest uppercase flex items-center gap-2">
        <HexIcon className="text-hive-gold" size={28} />
        The Hive
      </div>
      
      {/* Navigation Links */}
      <div className="flex gap-8 font-medium">
        <Link 
          to="/" 
          className={`transition-colors duration-300 hover:text-hive-yellow ${isActive('/') ? 'text-hive-yellow' : 'text-hive-text'}`}
        >
          Home
        </Link>
        
        <Link 
          to="/dashboard" 
          className={`flex items-center gap-2 transition-colors duration-300 hover:text-hive-yellow ${isActive('/dashboard') ? 'text-hive-yellow' : 'text-hive-text'}`}
        >
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        {/* New Control Link */}
        <Link 
          to="/control" 
          className={`flex items-center gap-2 transition-colors duration-300 hover:text-hive-yellow ${isActive('/control') ? 'text-hive-yellow' : 'text-hive-text'}`}
        >
          <Cpu size={18} /> Controle
        </Link>
        
        <Link 
          to="/settings" 
          className={`flex items-center gap-2 transition-colors duration-300 hover:text-hive-yellow ${isActive('/settings') ? 'text-hive-yellow' : 'text-hive-text'}`}
        >
          <Settings size={18} /> Configurações
        </Link>
        
        <Link 
          to="/guide" 
          className={`flex items-center gap-2 transition-colors duration-300 hover:text-hive-yellow ${isActive('/guide') ? 'text-hive-yellow' : 'text-hive-text'}`}
        >
          <BookOpen size={18} /> Guia
        </Link>
      </div>

    </nav>
  );
}