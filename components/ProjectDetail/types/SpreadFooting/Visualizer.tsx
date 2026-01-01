import React from 'react';

const SpreadFootingVisualizer: React.FC<{ data: any }> = ({ data }) => {
  const { size = 6, thickness = 12 } = data;
  const fw = size * 10;
  const ft = (thickness / 12) * 10;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(200, 200) scale(4)">
           <rect x={-5} y={-15} width={10} height={15} fill="#f1f3f6" stroke="#adb5bd" strokeWidth="0.5" />
           <rect x={-fw/2} y={0} width={fw} height={ft} fill="#f1f3f6" stroke="#adb5bd" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  );
};

export default SpreadFootingVisualizer;