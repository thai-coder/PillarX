import React from 'react';

const SteelJoistVisualizer: React.FC<{ data: any }> = ({ data }) => {
  const { length = 24, depth = 16 } = data;
  const w = length * 10;
  const h = (depth / 12) * 10;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(200, 200) scale(1.5)">
           <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="none" stroke="#adb5bd" strokeWidth="1" />
           <path d={`M${-w/2},${-h/2} L${-w/2 + w/4},${h/2} L${-w/2 + w/2},${-h/2} L${-w/2 + 3*w/4},${h/2} L${w/2},${-h/2}`} stroke="#adb5bd" fill="none" />
           <path d={`M${-w/2},${h/2} l-5,10 h10 z`} fill="#adb5bd" />
           <path d={`M${w/2},${h/2} l-5,10 h10 z`} fill="#adb5bd" />
        </g>
      </svg>
    </div>
  );
};

export default SteelJoistVisualizer;