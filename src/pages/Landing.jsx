import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Activity, Cpu, Hexagon as HexIcon } from 'lucide-react';
import Hexagon from '../components/Hexagon';

// 1. The Alternating Grid Blueprint
// 7-6-7-6-7-6-7 pattern creates perfect nesting.
// The interactive nodes are positioned to form the diamond.
const hiveBlueprint = [        // Row 0 (7)
  ['e', 'e', 'e', 'e', 'e', 'e'],               // Row 1 (6)
  ['e', 'e', 'e', 'e', 'e', 'e', 'e'],    // Row 2 (7) 
  ['e', 'e', 'hero', 'e', 'e', 'secure'],    // Row 3 (6) 
  ['e', 'analyze', 'e', 'e', 'control', 'e', 'e'],       // Row 4 (7) 
  ['e', 'e', 'e', 'e', 'e', 'e'],               // Row 5 (6)
  ['e', 'e', 'e', 'e', 'e', 'e', 'e']           // Row 6 (7)
];

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
        return null; // Empty nodes just show the geometric pattern
    }
  };

  const getHexStyles = (type) => {
    // Sizing: w-48/h-[210px] is roughly a perfect hexagon ratio. 
    // Adjust these if your clip-path utility relies on a different aspect ratio.
    const baseSize = "w-40 h-[175px] md:w-56 md:h-[245px]"; 
    
    if (type === 'e') {
      return {
        className: `${baseSize} pointer-events-none opacity-40`,
        borderClassName: "bg-hive-yellow/10", // Dim yellow wireframe
        innerClassName: "bg-[#0a0a0a]" // Very dark, matches background
      };
    }
    
    // Interactive Nodes
    return {
      className: `${baseSize} z-20 cursor-pointer transition-transform duration-500 hover:scale-105 hover:z-50`,
      // Bright yellow border that glows on hover
      borderClassName: "bg-hive-yellow group-hover:bg-hive-gold group-hover:shadow-[0_0_30px_rgba(255,193,7,0.6)]",
      // Black interior that fills with yellow on hover
      innerClassName: "bg-hive-black group-hover:bg-hive-yellow transition-colors duration-300"
    };
  };

  return (
    // 1. fixed inset-0: Locks the container to the exact viewport boundaries.
    // 2. overflow-hidden: Clips anything bleeding off the edge.
    // 3. overscroll-none touch-none: Prevents mobile pull-to-refresh and elastic bounce.
    // 4. h-[100dvh]: Uses dynamic viewport height so mobile browser UI bars don't cause overflow.
    <main className="fixed inset-0 w-screen h-[100dvh] flex items-center justify-center bg-[#0a0a0a] overflow-hidden overscroll-none touch-none">
      
      {/* The grid container. 
        Note: If you want the entire diamond to shrink and fit fully on smaller screens 
        instead of bleeding off, you can add responsive scaling here like `scale-75 md:scale-100`.
      */}
      <div className="relative flex flex-col items-center justify-center w-max">
        
        {hiveBlueprint.map((row, rowIndex) => (
          <div 
            key={`row-${rowIndex}`} 
            // The negative margin math depends on your height. 
            // 25% of 245px = 61px. 25% of 175px = 43px.
            className={`flex justify-center -space-x-1 md:-space-x-2 ${rowIndex > 0 ? '-mt-[43px] md:-mt-[61px]' : ''}`}
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