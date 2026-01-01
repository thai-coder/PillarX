import React from 'react';

interface VisualizerProps {
  data: any;
}

const ColumnVisualizer: React.FC<VisualizerProps> = ({ data }) => {
  const { height = 12, widthX = 16 } = data;
  
  const colWidth = (widthX / 12) * 10;
  const colHeight = height * 10;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <g transform="translate(200, 200) scale(2)">
           <rect 
             x={-colWidth / 2} 
             y={-colHeight / 2} 
             width={colWidth} 
             height={colHeight} 
             fill="#f1f3f6" 
             stroke="#adb5bd" 
             strokeWidth="1" 
           />
           {/* Base Plate or ground line */}
           <line x1={-colWidth} y1={colHeight/2} x2={colWidth} y2={colHeight/2} stroke="#adb5bd" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};

export default ColumnVisualizer;