import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hexagon as HexIcon, LayoutDashboard, Settings, BookOpen, Cpu, Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-hive-brown border-b-2 border-hive-gold sticky top-0 z-50 shadow-lg">
      
      {/* Barra superior (Logo + Botão Burguer no mobile / Logo + Links no desktop) */}
      <div className="px-4 md:px-8 py-4 flex justify-between items-center w-full">
        
        {/* Logo Section */}
        <div className="text-2xl font-bold text-hive-yellow tracking-widest uppercase flex items-center gap-2">
          <HexIcon className="text-hive-gold" size={28} />
          The Hive
        </div>
        
        {/* Navigation Links - DESKTOP (Escondido no mobile) */}
        <div className="hidden md:flex gap-8 font-medium">
          <Link to="/" className={`transition-colors duration-300 hover:text-hive-yellow ${isActive('/') ? 'text-hive-yellow' : 'text-hive-text'}`}>
            Home
          </Link>
          
          <Link to="/dashboard" className={`flex items-center gap-2 transition-colors duration-300 hover:text-hive-yellow ${isActive('/dashboard') ? 'text-hive-yellow' : 'text-hive-text'}`}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>

          <Link to="/control" className={`flex items-center gap-2 transition-colors duration-300 hover:text-hive-yellow ${isActive('/control') ? 'text-hive-yellow' : 'text-hive-text'}`}>
            <Cpu size={18} /> Controle
          </Link>
          
          <Link to="/settings" className={`flex items-center gap-2 transition-colors duration-300 hover:text-hive-yellow ${isActive('/settings') ? 'text-hive-yellow' : 'text-hive-text'}`}>
            <Settings size={18} /> Configurações
          </Link>
          
          <Link to="/guide" className={`flex items-center gap-2 transition-colors duration-300 hover:text-hive-yellow ${isActive('/guide') ? 'text-hive-yellow' : 'text-hive-text'}`}>
            <BookOpen size={18} /> Guia
          </Link>
        </div>

        {/* Botão Menu Burguer - MOBILE (Escondido no desktop) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-hive-yellow hover:text-hive-gold transition-colors p-1"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

      </div>

      {/* Navigation Links - DROPDOWN MOBILE */}
      {isOpen && (
        <div className="md:hidden bg-hive-black/95 border-t border-hive-gold/20 flex flex-col px-6 py-6 gap-6 shadow-2xl absolute w-full left-0">
          <Link onClick={closeMenu} to="/" className={`text-lg transition-colors duration-300 ${isActive('/') ? 'text-hive-yellow font-bold' : 'text-hive-text'}`}>
            Home
          </Link>
          
          <Link onClick={closeMenu} to="/dashboard" className={`flex items-center gap-3 text-lg transition-colors duration-300 ${isActive('/dashboard') ? 'text-hive-yellow font-bold' : 'text-hive-text'}`}>
            <LayoutDashboard size={22} /> Dashboard
          </Link>

          <Link onClick={closeMenu} to="/control" className={`flex items-center gap-3 text-lg transition-colors duration-300 ${isActive('/control') ? 'text-hive-yellow font-bold' : 'text-hive-text'}`}>
            <Cpu size={22} /> Controle
          </Link>
          
          <Link onClick={closeMenu} to="/settings" className={`flex items-center gap-3 text-lg transition-colors duration-300 ${isActive('/settings') ? 'text-hive-yellow font-bold' : 'text-hive-text'}`}>
            <Settings size={22} /> Configurações
          </Link>
          
          <Link onClick={closeMenu} to="/guide" className={`flex items-center gap-3 text-lg transition-colors duration-300 ${isActive('/guide') ? 'text-hive-yellow font-bold' : 'text-hive-text'}`}>
            <BookOpen size={22} /> Guia
          </Link>
        </div>
      )}

    </nav>
  );
}
