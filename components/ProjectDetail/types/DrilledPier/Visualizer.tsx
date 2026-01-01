import React from 'react';

const DrilledPierVisualizer: React.FC<{ data: any }> = ({ data }) => {
  const { diameter = 24, length = 20 } = data;
  const d = (diameter / 12) * 10;
  const l = length * 10;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(200, 150) scale(1.5)">
           <line x1={-50} y1={0} x2={50} y2={0} stroke="#adb5bd" />
           <rect x={-d/2} y={0} width={d} height={l} fill="#f1f3f6" stroke="#adb5bd" />
        </g>
      </svg>
    </div>
  );
};

export default DrilledPierVisualizer;