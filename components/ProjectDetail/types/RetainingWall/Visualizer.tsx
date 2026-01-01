import React from 'react';

interface VisualizerProps {
  data: any;
}

const RetainingWallVisualizer: React.FC<VisualizerProps> = ({ data }) => {
  const { wallHeight, wallThickness, toeLength, heelLength, footingThickness, hasKey } = data;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(200, 220) scale(4)">
           {/* Wall Line */}
           <line x1={20} y1={-wallHeight*10 + 20} x2={100} y2={-wallHeight*10 + 20} stroke="#8B4513" strokeWidth="0.5" />
           <path d={`M20,${-wallHeight*10 + 20} l5,5 M30,${-wallHeight*10 + 20} l5,5 M40,${-wallHeight*10 + 20} l5,5`} stroke="#8B4513" strokeWidth="0.3" />
           {/* Structural Shapes */}
           <rect x={-(wallThickness/12)*10} y={-wallHeight*10} width={(wallThickness/12)*20} height={wallHeight*10} fill="#f1f3f6" stroke="#adb5bd" strokeWidth="0.5" />
           <rect x={-toeLength*10 - (wallThickness/12)*10} y={0} width={(toeLength*10) + ((wallThickness/12)*20) + (heelLength*10)} height={(footingThickness/12)*10} fill="#f1f3f6" stroke="#adb5bd" strokeWidth="0.5" />
           {hasKey && <rect x={-5} y={(footingThickness/12)*10} width={10} height={10} fill="#f1f3f6" stroke="#adb5bd" strokeWidth="0.5" />}
        </g>
      </svg>
    </div>
  );
};

export default RetainingWallVisualizer;