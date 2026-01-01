import React from 'react';

const CompositeBeamVisualizer: React.FC<{ data: any }> = ({ data }) => {
  const { length = 30, slabThickness = 4, beamDepth = 18 } = data;
  const w = length * 10;
  const sH = (slabThickness / 12) * 10;
  const bH = (beamDepth / 12) * 10;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(200, 200) scale(1.5)">
           <rect x={-w / 2} y={-sH - bH/2} width={w} height={sH} fill="#e9ecef" stroke="#adb5bd" />
           <rect x={-w / 2} y={-bH / 2} width={w} height={bH} fill="#f1f3f6" stroke="#adb5bd" />
        </g>
      </svg>
    </div>
  );
};

export default CompositeBeamVisualizer;