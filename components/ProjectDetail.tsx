import React, { useState } from 'react';
import { ChevronLeft, HelpCircle, User, Settings, FolderOpen, Maximize, ChevronDown, CheckCircle, Plus, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [componentName, setComponentName] = useState(`${project.lastComponentType || 'Component'} 1`);
  
  // Wall Properties State
  const [length, setLength] = useState<number>(10);
  const [toeSoil, setToeSoil] = useState<number>(0);
  const [heelSoil, setHeelSoil] = useState<number>(6);
  const [wallHeight, setWallHeight] = useState<number>(8);
  const [wallThickness, setWallThickness] = useState<number>(12);
  const [toeLength, setToeLength] = useState<number>(3);
  const [heelLength, setHeelLength] = useState<number>(4);
  const [footingThickness, setFootingThickness] = useState<number>(12);
  const [hasKey, setHasKey] = useState(true);
  const [keyDepth, setKeyDepth] = useState<number>(12);
  const [keyWidth, setKeyWidth] = useState<number>(12);
  const [keyOffset, setKeyOffset] = useState<number>(6);

  const InputRow = ({ label, value, onChange, unit }: { label: string, value: string | number, onChange: (val: any) => void, unit?: string }) => (
    <div className="flex items-center justify-between mb-3">
      <label className="text-sm text-gray-700 w-1/3">{label}</label>
      <div className="flex items-center w-2/3">
        <input 
          type="number" 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full border border-gray-300 px-2 py-1 text-sm rounded-sm focus:outline-none focus:border-blue-500"
        />
        {unit && <span className="ml-2 text-xs text-gray-500 w-6">{unit}</span>}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
      {/* Header */}
      <header className="bg-[#005a8d] text-white h-12 flex items-center justify-between px-4 shadow-md z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80" onClick={onBack}>
            <div className="bg-white text-[#005a8d] rounded-full p-0.5">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                 <path d="M15 18l-6-6 6-6" />
               </svg>
            </div>
            <span className="font-semibold text-lg tracking-tight">PillarX</span>
          </div>
          <div className="h-6 w-px bg-blue-400/50 mx-2"></div>
          <span className="font-medium">{project.name}</span>
        </div>
        
        <div className="flex items-center gap-6 text-sm font-medium">
          <button className="hover:text-blue-200">Feedback</button>
          <button className="hover:text-blue-200 flex items-center gap-1">Settings</button>
          <button className="hover:text-blue-200 flex items-center gap-1">Projects</button>
          <button className="hover:text-blue-200"><HelpCircle className="w-5 h-5" /></button>
          <button className="hover:text-blue-200"><User className="w-5 h-5" /></button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-0 hidden md:flex">
          <div className="p-4 border-b border-gray-200">
            <button className="w-full py-2 flex items-center justify-center gap-2 text-sm font-bold text-gray-800 hover:bg-gray-50 border border-transparent hover:border-gray-200 rounded">
              <Plus className="w-4 h-4" /> Add Component
            </button>
          </div>
          <div className="p-2 bg-gray-100 border-b border-gray-200 flex justify-between items-center px-4">
            <span className="text-xs text-gray-600 font-medium">List:</span>
            <span className="text-xs font-bold text-gray-800 flex items-center cursor-pointer">ALL <ChevronDown className="w-3 h-3 ml-1"/></span>
          </div>
          <div className="flex-1 overflow-y-auto">
             <div className="flex items-center gap-3 p-3 bg-blue-50 border-l-4 border-[#005a8d] cursor-pointer">
               <div className="text-[#005a8d]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                     <path d="M4 20h16" />
                     <path d="M12 4v16" />
                     <path d="M8 20v-4" />
                  </svg>
               </div>
               <span className="text-sm font-medium text-[#005a8d]">{componentName}</span>
             </div>
          </div>
        </aside>

        {/* Center Canvas Area */}
        <main className="flex-1 bg-white relative flex flex-col min-w-0">
          <div className="absolute top-4 left-4 z-10">
             <button 
               onClick={onBack}
               className="bg-white border border-gray-300 rounded p-1 shadow-sm text-gray-600 hover:text-blue-600 md:hidden"
             >
               <ChevronLeft className="w-4 h-4" />
             </button>
          </div>
          
          <div className="text-center pt-8 pb-4">
             <h2 className="text-gray-700 text-lg font-medium">{componentName}</h2>
             <div className="text-xs text-blue-600 font-medium flex items-center justify-center gap-1 cursor-pointer">
               All Loads | View <ChevronDown className="w-3 h-3" />
             </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-8 overflow-hidden relative">
            <div className="absolute top-4 right-4 flex flex-col gap-2">
               <button className="p-1.5 bg-white border border-gray-300 rounded text-gray-500 hover:text-blue-600">
                 <Maximize className="w-5 h-5" />
               </button>
               <button className="p-1.5 bg-white border border-gray-300 rounded text-gray-500 hover:text-blue-600">
                 <CheckCircle className="w-5 h-5" />
               </button>
               <button className="p-1.5 bg-white border border-gray-300 rounded text-gray-500 hover:text-blue-600">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 20v-8m0 0V4m0 8h8m-8 0H4" />
                 </svg>
               </button>
            </div>

            {/* SVG Visualization */}
            <div className="w-full h-full flex items-center justify-center">
              {/* Scaled Group based on inputs (simplified scaling) */}
              <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(200, 250) scale(4)">
                   {/* 
                     Coordinate System:
                     0,0 is top-center of footing
                     Scale: 1 unit = 1 pixel (internal), then scaled by transform
                   */}

                   {/* Soil Line - Heel */}
                   <line x1={20} y1={-wallHeight*10 + 20} x2={100} y2={-wallHeight*10 + 20} stroke="#8B4513" strokeWidth="0.5" />
                   {/* Soil Hatch - Heel */}
                   <path d={`M20,${-wallHeight*10 + 20} l5,5 M30,${-wallHeight*10 + 20} l5,5 M40,${-wallHeight*10 + 20} l5,5 M50,${-wallHeight*10 + 20} l5,5 M60,${-wallHeight*10 + 20} l5,5`} stroke="#8B4513" strokeWidth="0.3" />

                   {/* Soil Line - Toe */}
                   <line x1={-100} y1={50} x2={-20} y2={50} stroke="#8B4513" strokeWidth="0.5" />
                    {/* Soil Hatch - Toe */}
                   <path d="M-90,50 l5,5 M-80,50 l5,5 M-70,50 l5,5 M-60,50 l5,5" stroke="#8B4513" strokeWidth="0.3" />

                   {/* Wall Stem */}
                   <rect 
                     x={-(wallThickness/12)*10} 
                     y={-wallHeight*10} 
                     width={(wallThickness/12)*20} 
                     height={wallHeight*10} 
                     fill="#e5e7eb" 
                     stroke="#6b7280" 
                     strokeWidth="0.5"
                   />
                   
                   {/* Footing */}
                   <rect 
                     x={-toeLength*10 - (wallThickness/12)*10} 
                     y={0} 
                     width={(toeLength*10) + ((wallThickness/12)*20) + (heelLength*10)} 
                     height={(footingThickness/12)*10} 
                     fill="#e5e7eb" 
                     stroke="#6b7280" 
                     strokeWidth="0.5"
                   />

                   {/* Key */}
                   {hasKey && (
                     <rect 
                       x={-(wallThickness/12)*10 + ((keyOffset/12) * 10)} 
                       y={(footingThickness/12)*10} 
                       width={(keyWidth/12) * 10} 
                       height={(keyDepth/12) * 10} 
                       fill="#e5e7eb" 
                       stroke="#6b7280" 
                       strokeWidth="0.5"
                     />
                   )}
                </g>
              </svg>
            </div>
          </div>
        </main>

        {/* Right Sidebar Properties */}
        <aside className="w-96 bg-white border-l border-gray-200 flex flex-col shadow-lg z-10 overflow-hidden">
          <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
            <span className="text-xs font-semibold text-gray-500">Component:</span>
            <div className="flex items-center gap-2 font-bold text-sm text-gray-800 cursor-pointer">
              {componentName} <ChevronDown className="w-3 h-3" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-100">
            <button className="flex-1 py-2 text-xs font-medium text-blue-600 border-b-2 border-blue-600 bg-white">General<br/>Properties</button>
            <button className="flex-1 py-2 text-xs font-medium text-gray-500 hover:text-gray-700">Soil</button>
            <button className="flex-1 py-2 text-xs font-medium text-gray-500 hover:text-gray-700">Reinforcement</button>
            <button className="flex-1 py-2 text-xs font-medium text-gray-500 hover:text-gray-700">Loads</button>
          </div>

          {/* Subtabs */}
          <div className="flex px-4 pt-4 pb-2 gap-4">
             <button className="text-sm font-bold text-gray-900 border-b-2 border-blue-600 pb-1">Geometry</button>
             <button className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-1">Properties</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
             <div className="space-y-1">
               <InputRow label="Length:" value={length} onChange={setLength} unit="ft" />
               
               <div className="my-4 border-t border-gray-100"></div>
               
               <div className="flex items-center justify-between mb-2">
                 <label className="text-sm text-gray-700">Soil Heights:</label>
               </div>
               <div className="pl-4">
                  <InputRow label="Toe side" value={toeSoil} onChange={setToeSoil} unit="ft" />
                  <InputRow label="Heel side" value={heelSoil} onChange={setHeelSoil} unit="ft" />
               </div>

               <div className="my-4 border-t border-gray-100"></div>

               <div className="flex items-center justify-between mb-2">
                 <label className="text-sm text-gray-700">Wall:</label>
               </div>
               <div className="pl-4">
                  <InputRow label="Height" value={wallHeight} onChange={setWallHeight} unit="ft" />
                  <InputRow label="Thickness" value={wallThickness} onChange={setWallThickness} unit="in" />
               </div>

               <div className="my-4 border-t border-gray-100"></div>

               <InputRow label="Toe Length:" value={toeLength} onChange={setToeLength} unit="ft" />
               <InputRow label="Heel Length:" value={heelLength} onChange={setHeelLength} unit="ft" />
               <InputRow label="Footing Thickness:" value={footingThickness} onChange={setFootingThickness} unit="in" />

               <div className="my-4 border-t border-gray-100"></div>

               <div className="flex items-center justify-between mb-3">
                 <label className="text-sm text-gray-700 w-1/3">Key:</label>
                 <div className="w-2/3">
                    <select 
                      className="w-full border border-gray-300 px-2 py-1 text-sm rounded-sm focus:outline-none focus:border-blue-500 bg-white"
                      value={hasKey ? 'Yes' : 'No'}
                      onChange={(e) => setHasKey(e.target.value === 'Yes')}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                 </div>
               </div>

               {hasKey && (
                 <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-500 mb-1">Offset</label>
                      <div className="flex items-center">
                        <input type="number" value={keyOffset} onChange={(e) => setKeyOffset(Number(e.target.value))} className="w-full border border-gray-300 p-1 text-sm rounded-sm" />
                        <span className="text-xs text-gray-500 ml-1">in</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-500 mb-1">Width</label>
                      <div className="flex items-center">
                        <input type="number" value={keyWidth} onChange={(e) => setKeyWidth(Number(e.target.value))} className="w-full border border-gray-300 p-1 text-sm rounded-sm" />
                        <span className="text-xs text-gray-500 ml-1">in</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-500 mb-1">Depth</label>
                      <div className="flex items-center">
                        <input type="number" value={keyDepth} onChange={(e) => setKeyDepth(Number(e.target.value))} className="w-full border border-gray-300 p-1 text-sm rounded-sm" />
                        <span className="text-xs text-gray-500 ml-1">in</span>
                      </div>
                    </div>
                 </div>
               )}

             </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button className="w-full py-2 bg-white border border-gray-800 text-gray-900 rounded-full font-medium hover:bg-gray-100 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" /> Solve
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetail;