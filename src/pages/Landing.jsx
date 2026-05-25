import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Activity, Cpu, Hexagon as HexIcon } from 'lucide-react';
import Hexagon from '../components/Hexagon';

// 1. Grid Desktop
const hiveBlueprint = [        
  ['e', 'e', 'e', 'e', 'e', 'e'],               
  ['e', 'e', 'e', 'e', 'e', 'e', 'e'],    
  ['e', 'e', 'hero', 'e', 'e', 'secure'],    
  ['e', 'analyze', 'e', 'e', 'control', 'e', 'e'],       
  ['e', 'e', 'e', 'e', 'e', 'e'],               
  ['e', 'e', 'e', 'e', 'e', 'e', 'e']           
];

// 2. Lista simples para o Mobile
const mobileNodes = ['hero', 'analyze', 'control', 'secure'];

export default function Landing() {
  const renderHexContent = (type) => {
    const linkWrapper = "flex flex-col items-center justify-center w-full h-full cursor-pointer select-none";
    switch (type) {
      case 'analyze':
      return (
        <Link to="/dashboard" className={linkWrapper}>
          <Activity className="w-10 h-10 mb-3 text-hive-yellow group-hover:text-hive-black transition-colors duration-300" />
          <h3 className="text-lg font-bold tracking-widest text-hive-yellow group-hover:text-hive-black uppercase">Análise</h3>
        </Link>
      );
      case 'secure':
      return (
        <Link to="/settings" className={linkWrapper}>
          <Shield className="w-10 h-10 mb-3 text-hive-yellow group-hover:text-hive-black transition-colors duration-300" />
          <h3 className="text-lg font-bold tracking-widest text-hive-yellow group-hover:text-hive-black uppercase">Segurança</h3>
        </Link>
      );
      case 'control':
      return (
        <Link to="/control" className={linkWrapper}>
          <Cpu className="w-10 h-10 mb-3 text-hive-yellow group-hover:text-hive-black transition-colors duration-300" />
          <h3 className="text-lg font-bold tracking-widest text-hive-yellow group-hover:text-hive-black uppercase">Controles</h3>
        </Link>
      );
      case 'hero':
        return (
          <Link to="/guide" className={linkWrapper}>
            <HexIcon className="w-8 h-8 mb-2 text-hive-yellow group-hover:text-hive-black transition-colors duration-300" />
            <h1 className="text-xl md:text-2xl font-black mb-4 tracking-wider text-hive-yellow group-hover:text-hive-black uppercase">A Colmeia</h1>
          </Link>
        );
      default:
        return null; 
    }
  };

  const getHexStyles = (type) => {
    const baseSize = "w-40 h-[175px] md:w-56 md:h-[245px]"; 
    
    if (type === 'e') {
      return {
        className: `${baseSize} pointer-events-none opacity-40`,
        borderClassName: "bg-hive-yellow/10",
        innerClassName: "bg-[#0a0a0a]"
      };
    }
    
    return {
      className: `${baseSize} z-20 cursor-pointer transition-transform duration-500 hover:scale-105 hover:z-50`,
      borderClassName: "bg-hive-yellow group-hover:bg-hive-gold group-hover:shadow-[0_0_30px_rgba(255,193,7,0.6)]",
      innerClassName: "bg-hive-black group-hover:bg-hive-yellow transition-colors duration-300"
    };
  };

  return (

    <main className="h-[calc(100dvh-80px)] w-full flex items-center justify-center bg-[#0a0a0a] overflow-hidden overscroll-none touch-none">
      
    {/* --- LAYOUT MOBILE --- */}
    <div className="grid md:hidden grid-cols-2 gap-3 sm:gap-4 place-items-center max-w-[360px] mx-auto -mt-40">
      {mobileNodes.map((cellType, index) => {
        const styles = getHexStyles(cellType);
        return (
          <Hexagon 
            key={`mobile-${index}`}
            className={styles.className}
            borderClassName={styles.borderClassName}
            innerClassName={styles.innerClassName}
          >
            {renderHexContent(cellType)}
          </Hexagon>
        );
      })}
    </div>

      {/* --- LAYOUT DESKTOP --- */}
      <div className="hidden md:flex relative flex-col items-center justify-center w-max origin-center md:scale-[0.70] lg:scale-90 xl:scale-100 transition-transform duration-500">
        {hiveBlueprint.map((row, rowIndex) => (
          <div 
            key={`row-${rowIndex}`} 
            className={`flex justify-center -space-x-2 ${rowIndex > 0 ? '-mt-[61px]' : ''}`}
          >
            {row.map((cellType, cellIndex) => {
              const styles = getHexStyles(cellType);
              return (
                <Hexagon 
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className={styles.className}
                  borderClassName={styles.borderClassName}
                  innerClassName={styles.innerClassName}
                >
                  {renderHexContent(cellType)}
                </Hexagon>
              );
            })}
          </div>
        ))}
      </div>

    </main>
  );
}
