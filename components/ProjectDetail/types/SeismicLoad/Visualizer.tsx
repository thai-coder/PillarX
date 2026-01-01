import React from 'react';

const SeismicLoadVisualizer: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 100 100">
        <path d="M10 50 L20 30 L30 70 L40 30 L50 70 L60 30 L70 70 L80 30 L90 50" fill="none" stroke="#3b82f6" strokeWidth="2" />
        <text x="50" y="20" textAnchor="middle" className="text-[8px] font-bold" fill="#3b82f6">SEISMIC SPECTRUM</text>
      </svg>
    </div>
  );
};

export default SeismicLoadVisualizer;