import React from 'react';

export default function Hexagon({ 
  children, 
  className = "", 
  borderClassName = "bg-hive-yellow/20", // Default empty border 
  innerClassName = "bg-hive-black"       // Default empty background
}) {
  return (
    // Outer Wrapper: Sizing, positioning, hover triggers, and prevents squashing
    <div className={`relative group shrink-0 ${className}`}>
      
      {/* Middle Layer (The "Border"): Clipped to hexagon, provides the outline color */}
      <div className={`absolute inset-0 clip-hexagon transition-all duration-300 ${borderClassName}`} />
        
      {/* Inner Layer (The Background): Shrunk by 2px to reveal the border underneath */}
      <div className={`absolute inset-[2px] clip-hexagon flex flex-col justify-center items-center text-center transition-all duration-300 ${innerClassName}`}>
        
        {/* Content Wrapper */}
        <div className="relative z-10 w-full h-full">
           {children}
        </div>

      </div>

    </div>
  );
}