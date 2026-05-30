import React from 'react';
import { Book, ShieldAlert, Activity, Cpu } from 'lucide-react';

export default function Guide() {
  
  // Custom function to handle smooth scrolling without breaking HashRouter
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-12 items-start">
      
      {/* Sticky Sidebar Navigation */}
      <aside className="sticky top-28 bg-hive-brown border border-hive-gold/20 p-6 shadow-lg rounded-xl">
        <h3 className="flex items-center gap-2 text-hive-gold font-bold mb-4 text-lg border-b border-hive-gold/20 pb-2">
          <Book size={20} /> Documentação
        </h3>
        <nav className="flex flex-col gap-1">
          <button 
            onClick={(e) => scrollToSection(e, 'introduction')} 
            className="block w-full text-left text-hive-text py-2 border-b border-white/5 transition-all hover:text-hive-yellow hover:pl-2"
          >
            Introdução
          </button>
          <button 
            onClick={(e) => scrollToSection(e, 'the-triad')} 
            className="block w-full text-left text-hive-text py-2 border-b border-white/5 transition-all hover:text-hive-yellow hover:pl-2"
          >
            O Sistema de Tríade
          </button>
          <button 
            onClick={(e) => scrollToSection(e, 'protocols')} 
            className="block w-full text-left text-hive-text py-2 border-b border-white/5 transition-all hover:text-hive-yellow hover:pl-2"
          >
            Protocolos Principais
          </button>
        </nav>
      </aside>

      {/* Main Reading Area */}
      <main>
        
        <section id="introduction" className="mb-16">
          <h2 className="text-3xl font-bold text-hive-gold border-b-2 border-hive-brown pb-3 mb-6">Introdução ao Enxame</h2>
          <p className="text-[#d1d1d1] leading-relaxed mb-6 text-lg">
            Bem-vindo(a) à Colmeia. Esta plataforma foi projetada para fornecer controle e monitoramento bidirecional sobre seus hardwares industriais. Ao contrário das arquiteturas tradicionais, nosso sistema utiliza uma abordagem assíncrona, garantindo que as máquinas comuniquem seus dados de telemetria acústica e recebam instruções operacionais sem bloquear a rede.
          </p>
          
          <div className="bg-hive-brown border-l-4 border-hive-yellow p-6 my-8 italic shadow-md rounded-r-xl">
            <strong className="text-hive-yellow flex items-center gap-2 mb-2 not-italic">
               <ShieldAlert size={20} /> Atenção:
            </strong> 
            Todos os comandos despachados para as máquinas são enfileirados no banco de dados central. O painel não força a conexão direta com o hardware; o hardware consulta o enxame quando está pronto.
          </div>
        </section>

        <section id="the-triad" className="mb-16">
          <h2 className="text-3xl font-bold text-hive-gold border-b-2 border-hive-brown pb-3 mb-6">O Sistema de Tríade</h2>
          <p className="text-[#d1d1d1] leading-relaxed mb-8 text-lg">
            A filosofia central da nossa plataforma repousa sobre três pilares fundamentais de integração hardware-software. Dominar esses três elementos garante controle absoluto sobre sua infraestrutura.
          </p>
          
          {/* The Triad 3-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
            <div className="bg-hive-brown p-8 text-center border-t-4 border-hive-yellow shadow-lg flex flex-col items-center hover:-translate-y-1 transition-transform rounded-b-xl">
              <ShieldAlert size={32} className="text-hive-yellow mb-4" />
              <h4 className="text-hive-gold font-bold uppercase tracking-widest mb-3">Segurança</h4>
              <p className="text-sm text-gray-300">Comunicação baseada em tokens (Device Tokens) e CORS estrito via API PHP para proteger as cargas de dados.</p>
            </div>
            <div className="bg-hive-brown p-8 text-center border-t-4 border-hive-yellow shadow-lg flex flex-col items-center hover:-translate-y-1 transition-transform rounded-b-xl">
              <Activity size={32} className="text-hive-yellow mb-4" />
              <h4 className="text-hive-gold font-bold uppercase tracking-widest mb-3">Análise</h4>
              <p className="text-sm text-gray-300">Telemetria acústica (dB) em tempo real com mapeamento automático de alertas Críticos e de Manutenção.</p>
            </div>
            <div className="bg-hive-brown p-8 text-center border-t-4 border-hive-yellow shadow-lg flex flex-col items-center hover:-translate-y-1 transition-transform rounded-b-xl">
              <Cpu size={32} className="text-hive-yellow mb-4" />
              <h4 className="text-hive-gold font-bold uppercase tracking-widest mb-3">Controle</h4>
              <p className="text-sm text-gray-300">Fila de comandos assíncrona (Troca de ID, Calibragem, Reinício) enviada diretamente aos sensores.</p>
            </div>
          </div>
        </section>

        <section id="protocols">
          <h2 className="text-3xl font-bold text-hive-gold border-b-2 border-hive-brown pb-3 mb-6">Protocolos Principais</h2>
          <p className="text-[#d1d1d1] leading-relaxed mb-6 text-lg">
            Antes de operar o Terminal de Controle ou analisar o Dashboard, revise as diretrizes operacionais do sistema:
          </p>
          
          {/* Custom Hexagon List */}
          <ul className="flex flex-col gap-4 text-[#d1d1d1] text-lg pl-2">
            <li className="flex items-start gap-4">
              <div className="w-3 h-3.5 bg-hive-gold clip-hexagon mt-2 shrink-0"></div>
              <span><strong>Métricas de Ruído:</strong> O painel rastreia a média móvel de ruído em Decibéis (dB). O status geral do enxame mudará automaticamente para MANUTENÇÃO ou CRÍTICO com base nos limites do banco de dados.</span>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-3 h-3.5 bg-hive-gold clip-hexagon mt-2 shrink-0"></div>
              <span><strong>Fila de Comandos (Async):</strong> Instruções enviadas via Terminal de Controle são gravadas com status <code className="text-hive-yellow bg-hive-black px-1 rounded">PENDENTE</code>. O comando só muda para ENVIADO quando a máquina específica envia seu próximo pacote de dados e lê a fila.</span>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-3 h-3.5 bg-hive-gold clip-hexagon mt-2 shrink-0"></div>
              <span><strong>Sincronização:</strong> O dashboard opera com requisições HTTP seguras. Utilize o botão "Sync Data" para forçar uma nova captura do histórico da tabela bruta.</span>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-3 h-3.5 bg-hive-gold clip-hexagon mt-2 shrink-0"></div>
              <span><strong>Integridade do ID:</strong> Nunca altere o ID da máquina (MUDAR_ID) no painel de controle sem confirmar que o nó receptor (Device Token) está ativo e pronto para a troca.</span>
            </li>
          </ul>
        </section>

      </main>
    </div>
  );
}