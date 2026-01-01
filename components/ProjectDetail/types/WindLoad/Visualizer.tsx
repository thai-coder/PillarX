import React from 'react';

const WindLoadVisualizer: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="200" height="200" viewBox="0 0 100 100">
        <g stroke="#3b82f6" strokeWidth="2" fill="none">
          <path d="M10 30 h40 M10 50 h60 M10 70 h40" />
          <path d="M50 30 l5-3 l-5-3 z" fill="#3b82f6" stroke="none" transform="translate(0, 3)"/>
          <path d="M70 50 l5-3 l-5-3 z" fill="#3b82f6" stroke="none" transform="translate(0, 3)"/>
          <path d="M50 70 l5-3 l-5-3 z" fill="#3b82f6" stroke="none" transform="translate(0, 3)"/>
        </g>
        <text x="50" y="20" textAnchor="middle" className="text-[8px] font-bold" fill="#3b82f6">WIND PRESSURE</text>
      </svg>
    </div>
  );
};

export default WindLoadVisualizer;