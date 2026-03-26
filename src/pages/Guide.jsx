import React from 'react';
import { Book, ShieldAlert, Activity, Cpu } from 'lucide-react';

export default function Guide() {
  return (
    <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-12 items-start">
      
      {/* Sticky Sidebar Navigation */}
      <aside className="sticky top-28 bg-hive-brown border border-hive-gold/20 p-6 shadow-lg">
        <h3 className="flex items-center gap-2 text-hive-gold font-bold mb-4 text-lg border-b border-hive-gold/20 pb-2">
          <Book size={20} /> Documentação
        </h3>
        <nav className="flex flex-col gap-1">
          <a href="#introduction" className="block text-hive-text py-2 border-b border-white/5 transition-all hover:text-hive-yellow hover:pl-2">Introdução</a>
          <a href="#the-triad" className="block text-hive-text py-2 border-b border-white/5 transition-all hover:text-hive-yellow hover:pl-2">O Sistema de Tríade</a>
          <a href="#protocols" className="block text-hive-text py-2 border-b border-white/5 transition-all hover:text-hive-yellow hover:pl-2">Protocolos Principais</a>
        </nav>
      </aside>

      {/* Main Reading Area */}
      <main>
        
        <section id="introduction" className="mb-16">
          <h2 className="text-3xl font-bold text-hive-gold border-b-2 border-hive-brown pb-3 mb-6">Introdução ao Enxame</h2>
          <p className="text-[#d1d1d1] leading-relaxed mb-6 text-lg">
            Bem-vindo(a) à Colmeia. Esta plataforma foi projetada para fornecer controle incomparável sobre seus fluxos de dados. Ao contrário das arquiteturas tradicionais de arquivos planos, nosso sistema utiliza uma abordagem descentralizada, garantindo que sua rede permaneça resiliente, adaptável e extremamente rápida.
          </p>
          
          <div className="bg-hive-brown border-l-4 border-hive-yellow p-6 my-8 italic shadow-md">
            <strong className="text-hive-yellow flex items-center gap-2 mb-2 not-italic">
               <ShieldAlert size={20} /> Atenção:
            </strong> 
            Todos os dados visualizados na Colmeia são criptografados de ponta a ponta. Suas chaves de operador são a única maneira de desbloquear o arquivo. Mantenha-as seguras e offline para garantir a integridade do seu sistema.
          </div>
        </section>

        <section id="the-triad" className="mb-16">
          <h2 className="text-3xl font-bold text-hive-gold border-b-2 border-hive-brown pb-3 mb-6">O Sistema de Tríade</h2>
          <p className="text-[#d1d1d1] leading-relaxed mb-8 text-lg">
            A filosofia central da nossa plataforma repousa sobre três pilares fundamentais. Nós nos referimos a isso como A Tríade. Domínio desses três elementos garante controle absoluto sobre sua infraestrutura.
          </p>
          
          {/* The Triad 3-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
            <div className="bg-hive-brown p-8 text-center border-t-4 border-hive-yellow shadow-lg flex flex-col items-center hover:-translate-y-1 transition-transform">
              <ShieldAlert size={32} className="text-hive-yellow mb-4" />
              <h4 className="text-hive-gold font-bold uppercase tracking-widest mb-3">Segurança</h4>
              <p className="text-sm text-gray-300">Arquitetura impenetrável de caixa preta protegendo as operações principais.</p>
            </div>
            <div className="bg-hive-brown p-8 text-center border-t-4 border-hive-yellow shadow-lg flex flex-col items-center hover:-translate-y-1 transition-transform">
              <Activity size={32} className="text-hive-yellow mb-4" />
              <h4 className="text-hive-gold font-bold uppercase tracking-widest mb-3">Análise</h4>
              <p className="text-sm text-gray-300">Telemetria em tempo real e mapeamento preditivo de nós.</p>
            </div>
            <div className="bg-hive-brown p-8 text-center border-t-4 border-hive-yellow shadow-lg flex flex-col items-center hover:-translate-y-1 transition-transform">
              <Cpu size={32} className="text-hive-yellow mb-4" />
              <h4 className="text-hive-gold font-bold uppercase tracking-widest mb-3">Controle</h4>
              <p className="text-sm text-gray-300">Controle total sobre a alocação de recursos e a lógica do enxame.</p>
            </div>
          </div>
        </section>

        <section id="protocols">
          <h2 className="text-3xl font-bold text-hive-gold border-b-2 border-hive-brown pb-3 mb-6">Protocolos Principais</h2>
          <p className="text-[#d1d1d1] leading-relaxed mb-6 text-lg">
            Antes de iniciar sua primeira sequência, revise as diretrizes operacionais:
          </p>
          
          {/* Custom Hexagon List */}
          <ul className="flex flex-col gap-4 text-[#d1d1d1] text-lg pl-2">
            <li className="flex items-start gap-4">
              <div className="w-3 h-3.5 bg-hive-gold clip-hexagon mt-2 shrink-0"></div>
              <span>Sempre verifique a integridade do nó antes de iniciar uma atualização em massa.</span>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-3 h-3.5 bg-hive-gold clip-hexagon mt-2 shrink-0"></div>
              <span>Não substitua os limites de resfriamento no painel principal a menos que esteja em um estado de emergência verificado.</span>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-3 h-3.5 bg-hive-gold clip-hexagon mt-2 shrink-0"></div>
              <span>Consulte o gráfico radar do Chart.js para monitorar a telemetria de 6 pontos.</span>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-3 h-3.5 bg-hive-gold clip-hexagon mt-2 shrink-0"></div>
              <span>Mantenha suas chaves de operador de nível 4 estritamente offline.</span>
            </li>
          </ul>
        </section>

      </main>
    </div>
  );
}