import React from 'react';
import { User, Shield, Bell, Monitor, Save, Camera } from 'lucide-react';
import Hexagon from '../components/Hexagon';

export default function Settings() {
  return (
    <div className="max-w-5xl mx-auto p-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
      
      {/* Sidebar Menu */}
      <aside className="flex flex-col gap-2">
        <button className="flex items-center gap-3 w-full text-left p-4 bg-hive-brown border-l-4 border-hive-yellow text-hive-text font-medium transition-colors">
          <User size={18} className="text-hive-yellow" /> Perfil da Conta
        </button>
        <button className="flex items-center gap-3 w-full text-left p-4 border-l-4 border-transparent hover:bg-hive-brown hover:border-hive-yellow transition-colors">
          <Shield size={18} /> Segurança e Acesso
        </button>
        <button className="flex items-center gap-3 w-full text-left p-4 border-l-4 border-transparent hover:bg-hive-brown hover:border-hive-yellow transition-colors">
          <Bell size={18} /> Notificações
        </button>
        <button className="flex items-center gap-3 w-full text-left p-4 border-l-4 border-transparent hover:bg-hive-brown hover:border-hive-yellow transition-colors">
          <Monitor size={18} /> Preferências do Sistema
        </button>
      </aside>

      {/* Main Settings Area */}
      <main className="bg-hive-brown border border-hive-gold/30 p-8 shadow-xl">
        
        {/* Avatar Section */}
        <div className="flex items-center gap-6 mb-10">
          <Hexagon className="w-28 h-32 bg-hive-gold p-0 flex justify-center items-center hover:-translate-y-0 hover:bg-hive-gold">
            <div className="w-[104px] h-[120px] bg-[#1a150f] clip-hexagon flex justify-center items-center">
               <User size={40} className="text-hive-gold" />
            </div>
          </Hexagon>
          <div>
            <h2 className="text-2xl font-bold text-hive-yellow mb-1">Operador Prime</h2>
            <p className="text-hive-gold text-sm mb-3">Nível 4 de Acesso</p>
            <button className="flex items-center gap-2 bg-hive-black text-hive-text border border-hive-gold px-4 py-2 text-sm uppercase font-bold hover:bg-hive-gold hover:text-hive-black transition-colors">
              <Camera size={14} /> Mudar Avatar
            </button>
          </div>
        </div>

        <hr className="border-t border-hive-gold/20 mb-8" />

        {/* Form Inputs */}
        <form>
          <div className="flex flex-col mb-6">
            <label htmlFor="username" className="text-hive-gold text-xs uppercase tracking-widest mb-2 font-bold">Username</label>
            <input 
              type="text" 
              id="username" 
              defaultValue="Operator Prime" 
              className="bg-hive-black/50 border-b border-hive-gold text-hive-text px-4 py-3 focus:outline-none focus:border-b-2 focus:border-hive-yellow focus:bg-[#362d22] transition-all"
            />
          </div>

          <div className="flex flex-col mb-10">
            <label htmlFor="email" className="text-hive-gold text-xs uppercase tracking-widest mb-2 font-bold">Email</label>
            <input 
              type="email" 
              id="email" 
              defaultValue="prime@thehive.network" 
              className="bg-hive-black/50 border-b border-hive-gold text-hive-text px-4 py-3 focus:outline-none focus:border-b-2 focus:border-hive-yellow focus:bg-[#362d22] transition-all"
            />
          </div>

          <h3 className="text-xl font-bold text-hive-gold mb-6">Protocolos de Segurança</h3>

          {/* Custom Toggle Switch 1 */}
          <div className="flex justify-between items-center bg-hive-black/30 border border-hive-gold/20 p-4 mb-4">
            <div>
              <div className="font-bold text-hive-text">Autenticação de Dois Fatores</div>
            </div>
            <label className="relative inline-block w-12 h-6 cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              {/* The Track */}
              <div className="w-full h-full bg-hive-black border border-hive-gold peer-checked:border-hive-yellow transition-colors duration-300"></div>
              {/* The Hexagon Thumb */}
              <div className="absolute left-[2px] top-[2px] w-5 h-5 bg-hive-text clip-hexagon transition-transform duration-300 peer-checked:translate-x-[24px] peer-checked:bg-hive-yellow"></div>
            </label>
          </div>

          <div className="text-right mt-8">
            <button type="button" className="inline-flex items-center gap-2 bg-hive-black text-hive-yellow border border-hive-yellow px-6 py-3 font-bold uppercase tracking-wide transition-colors hover:bg-hive-yellow hover:text-hive-black">
              <Save size={18} /> Salvar Configurações
            </button>
          </div>
        </form>

      </main>
    </div>
  );
}