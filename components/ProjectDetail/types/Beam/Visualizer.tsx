import React from 'react';

interface VisualizerProps {
  data: any;
}

const BeamVisualizer: React.FC<VisualizerProps> = ({ data }) => {
  const { length = 20, depth = 24 } = data;
  
  // Scale factor: 10 units per foot
  const rectWidth = length * 10;
  const rectHeight = (depth / 12) * 10;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(200, 200) scale(1.5)">
           <rect 
             x={-rectWidth / 2} 
             y={-rectHeight / 2} 
             width={rectWidth} 
             height={rectHeight} 
             fill="#f1f3f6" 
             stroke="#adb5bd" 
             strokeWidth="1" 
           />
           {/* Supports */}
           <path d={`M${-rectWidth/2},${rectHeight/2} l-5,10 h10 z`} fill="#adb5bd" />
           <path d={`M${rectWidth/2},${rectHeight/2} l-5,10 h10 z`} fill="#adb5bd" />
        </g>
      </svg>
    </div>
  );
};

export default BeamVisualizer;