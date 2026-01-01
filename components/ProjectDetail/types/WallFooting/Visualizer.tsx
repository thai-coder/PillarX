import React from 'react';

const WallFootingVisualizer: React.FC<{ data: any }> = ({ data }) => {
  const { width = 2, thickness = 12 } = data;
  const fw = width * 20;
  const ft = (thickness / 12) * 10;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(200, 200) scale(4)">
           <line x1={0} y1={-15} x2={0} y2={0} stroke="#adb5bd" strokeWidth="2" />
           <rect x={-fw/2} y={0} width={fw} height={ft} fill="#f1f3f6" stroke="#adb5bd" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  );
};

export default WallFootingVisualizer;