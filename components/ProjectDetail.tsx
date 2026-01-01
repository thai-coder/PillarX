import React, { useState, useMemo } from 'react';
import { ChevronLeft, HelpCircle, User, Settings, FolderOpen, Maximize, ChevronDown, CheckCircle, Plus, ChevronRight, X } from 'lucide-react';
import { Project, ProjectComponent } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onUpdateProject: (project: Project) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onUpdateProject }) => {
  const [activeComponentId, setActiveComponentId] = useState<string>(project.components[0]?.id || '');
  const [isAddComponentOpen, setIsAddComponentOpen] = useState(false);
  
  const activeComponent = project.components.find(c => c.id === activeComponentId) || project.components[0];

  // Component Properties State (Mocking for the active component)
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

  const sortedComponents = useMemo(() => {
    return [...project.components].sort((a, b) => b.quantity - a.quantity);
  }, [project.components]);

  const handleAddComponent = (type: string) => {
    const newComponent: ProjectComponent = {
      id: `c_${Date.now()}`,
      type,
      name: `${type} ${project.components.filter(c => c.type === type).length + 1}`,
      quantity: 1
    };

    const updatedProject = {
      ...project,
      components: [...project.components, newComponent],
      componentsCount: project.componentsCount + 1
    };

    onUpdateProject(updatedProject);
    setActiveComponentId(newComponent.id);
    setIsAddComponentOpen(false);
  };

  const SectionTile = ({ label, icon }: { label: string; icon: React.ReactNode }) => (
    <div 
      className="flex flex-col items-center gap-2 cursor-pointer group"
      onClick={() => handleAddComponent(label)}
    >
      <div className="w-20 h-20 border border-gray-300 rounded-lg flex items-center justify-center bg-white group-hover:border-blue-600 group-hover:shadow-md transition-all">
        {icon}
      </div>
      <span className="text-[11px] text-gray-700 font-semibold text-center">{label}</span>
    </div>
  );

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
          {/* User Icon removed per user request */}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-0 hidden md:flex">
          <div className="p-4 border-b border-gray-200">
            <button 
              onClick={() => setIsAddComponentOpen(true)}
              className="w-full py-2 flex items-center justify-center gap-2 text-sm font-bold text-gray-800 hover:bg-gray-50 border border-gray-800 rounded transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Component
            </button>
          </div>
          <div className="p-2 bg-gray-50 border-b border-gray-200 flex justify-between items-center px-4">
            <span className="text-xs text-gray-600 font-medium">List:</span>
            <span className="text-xs font-bold text-gray-800 flex items-center cursor-pointer">ALL <ChevronDown className="w-3 h-3 ml-1"/></span>
          </div>
          <div className="flex-1 overflow-y-auto">
             {sortedComponents.map((comp) => (
               <div 
                 key={comp.id}
                 onClick={() => setActiveComponentId(comp.id)}
                 className={`flex items-center gap-3 p-3 cursor-pointer transition-colors border-l-4 ${
                   activeComponentId === comp.id 
                    ? 'bg-blue-50 border-[#005a8d] text-[#005a8d]' 
                    : 'border-transparent hover:bg-gray-50 text-gray-700'
                 }`}
               >
                 <div className={activeComponentId === comp.id ? 'text-[#005a8d]' : 'text-gray-400'}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                       <path d="M4 20h16" />
                       <path d="M12 4v16" />
                       <path d="M8 20v-4" />
                    </svg>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-sm font-medium">{comp.name}</span>
                   {comp.quantity > 1 && <span className="text-[10px] opacity-70">Qty: {comp.quantity}</span>}
                 </div>
               </div>
             ))}
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
             <h2 className="text-gray-700 text-lg font-medium">{activeComponent?.name}</h2>
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

            <div className="w-full h-full flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(200, 250) scale(4)">
                   <line x1={20} y1={-wallHeight*10 + 20} x2={100} y2={-wallHeight*10 + 20} stroke="#8B4513" strokeWidth="0.5" />
                   <path d={`M20,${-wallHeight*10 + 20} l5,5 M30,${-wallHeight*10 + 20} l5,5 M40,${-wallHeight*10 + 20} l5,5 M50,${-wallHeight*10 + 20} l5,5 M60,${-wallHeight*10 + 20} l5,5`} stroke="#8B4513" strokeWidth="0.3" />
                   <line x1={-100} y1={50} x2={-20} y2={50} stroke="#8B4513" strokeWidth="0.5" />
                   <path d="M-90,50 l5,5 M-80,50 l5,5 M-70,50 l5,5 M-60,50 l5,5" stroke="#8B4513" strokeWidth="0.3" />
                   <rect x={-(wallThickness/12)*10} y={-wallHeight*10} width={(wallThickness/12)*20} height={wallHeight*10} fill="#e5e7eb" stroke="#6b7280" strokeWidth="0.5" />
                   <rect x={-toeLength*10 - (wallThickness/12)*10} y={0} width={(toeLength*10) + ((wallThickness/12)*20) + (heelLength*10)} height={(footingThickness/12)*10} fill="#e5e7eb" stroke="#6b7280" strokeWidth="0.5" />
                   {hasKey && (
                     <rect x={-(wallThickness/12)*10 + ((keyOffset/12) * 10)} y={(footingThickness/12)*10} width={(keyWidth/12) * 10} height={(keyDepth/12) * 10} fill="#e5e7eb" stroke="#6b7280" strokeWidth="0.5" />
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
              {activeComponent?.name} <ChevronDown className="w-3 h-3" />
            </div>
          </div>

          <div className="flex border-b border-gray-200 bg-gray-100">
            <button className="flex-1 py-2 text-xs font-medium text-blue-600 border-b-2 border-blue-600 bg-white">General<br/>Properties</button>
            <button className="flex-1 py-2 text-xs font-medium text-gray-500 hover:text-gray-700">Soil</button>
            <button className="flex-1 py-2 text-xs font-medium text-gray-500 hover:text-gray-700">Reinforcement</button>
            <button className="flex-1 py-2 text-xs font-medium text-gray-500 hover:text-gray-700">Loads</button>
          </div>

          <div className="flex px-4 pt-4 pb-2 gap-4">
             <button className="text-sm font-bold text-gray-900 border-b-2 border-blue-600 pb-1">Geometry</button>
             <button className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-1">Properties</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
             <div className="space-y-1">
               <InputRow label="Length:" value={length} onChange={setLength} unit="ft" />
               <div className="my-4 border-t border-gray-100"></div>
               <div className="flex items-center justify-between mb-2"><label className="text-sm text-gray-700">Soil Heights:</label></div>
               <div className="pl-4">
                  <InputRow label="Toe side" value={toeSoil} onChange={setToeSoil} unit="ft" />
                  <InputRow label="Heel side" value={heelSoil} onChange={setHeelSoil} unit="ft" />
               </div>
               <div className="my-4 border-t border-gray-100"></div>
               <div className="flex items-center justify-between mb-2"><label className="text-sm text-gray-700">Wall:</label></div>
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
                    <select className="w-full border border-gray-300 px-2 py-1 text-sm rounded-sm focus:outline-none focus:border-blue-500 bg-white" value={hasKey ? 'Yes' : 'No'} onChange={(e) => setHasKey(e.target.value === 'Yes')}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                 </div>
               </div>
               {hasKey && (
                 <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col"><label className="text-xs text-gray-500 mb-1">Offset</label><div className="flex items-center"><input type="number" value={keyOffset} onChange={(e) => setKeyOffset(Number(e.target.value))} className="w-full border border-gray-300 p-1 text-sm rounded-sm" /><span className="text-xs text-gray-500 ml-1">in</span></div></div>
                    <div className="flex flex-col"><label className="text-xs text-gray-500 mb-1">Width</label><div className="flex items-center"><input type="number" value={keyWidth} onChange={(e) => setKeyWidth(Number(e.target.value))} className="w-full border border-gray-300 p-1 text-sm rounded-sm" /><span className="text-xs text-gray-500 ml-1">in</span></div></div>
                    <div className="flex flex-col"><label className="text-xs text-gray-500 mb-1">Depth</label><div className="flex items-center"><input type="number" value={keyDepth} onChange={(e) => setKeyDepth(Number(e.target.value))} className="w-full border border-gray-300 p-1 text-sm rounded-sm" /><span className="text-xs text-gray-500 ml-1">in</span></div></div>
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

      {/* Add Component Dialog */}
      {isAddComponentOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-[1px]">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-8">
            <button 
              onClick={() => setIsAddComponentOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h1 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-tight">Choose Component:</h1>

            <div className="space-y-12">
              {/* Building Structure Elements */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-32 flex-shrink-0 pt-1">
                  <h3 className="text-xs font-bold text-gray-500 leading-tight uppercase tracking-wider">
                    Building<br />Structure<br />Elements
                  </h3>
                </div>
                <div className="flex flex-wrap gap-8">
                  <SectionTile label="Beam" icon={<svg width="50" height="20" viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 15h50" /><path d="M5 15l-3 6h6z" fill="white" /><path d="M55 15l-3 6h6z" fill="white" /></svg>} />
                  <SectionTile label="Column" icon={<svg width="20" height="50" viewBox="0 0 30 60" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 5v45" /><path d="M10 50l5 -5l5 5z" fill="white" /><path d="M5 50h20" /></svg>} />
                  <SectionTile label="Steel Joist" icon={<svg width="50" height="20" viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="8" width="50" height="14" /><path d="M5 22L15 8L25 22L35 8L45 22L55 8" /></svg>} />
                  <SectionTile label="Composite Beam" icon={<svg width="50" height="30" viewBox="0 0 60 40" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="5" width="50" height="8" fill="rgba(0,0,0,0.05)" /><path d="M20 13h20M30 13v15M20 28h20" /></svg>} />
                </div>
              </div>

              {/* Foundation Elements */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-32 flex-shrink-0 pt-1">
                  <h3 className="text-xs font-bold text-gray-500 leading-tight uppercase tracking-wider">
                    Foundation<br />Elements
                  </h3>
                </div>
                <div className="flex flex-wrap gap-8">
                  <SectionTile label="Retaining Wall" icon={<svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 10v30h15M20 25l-10 10M5 35h40" /></svg>} />
                  <SectionTile label="Spread Footing" icon={<svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="20" y="10" width="10" height="15" /><rect x="10" y="25" width="30" height="10" /></svg>} />
                  <SectionTile label="Wall Footing" icon={<svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M25 10v15"/><rect x="15" y="25" width="20" height="10" /></svg>} />
                  <SectionTile label="Drilled Pier" icon={<svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 20h40"/><rect x="20" y="20" width="10" height="20" /></svg>} />
                </div>
              </div>

              {/* Load Generators */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-32 flex-shrink-0 pt-1">
                  <h3 className="text-xs font-bold text-gray-500 leading-tight uppercase tracking-wider">
                    Load<br />Generators
                  </h3>
                </div>
                <div className="flex flex-wrap gap-8">
                  <SectionTile label="Seismic Load" icon={<svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 25h5l5-10l10 20l10-20l5 10h5" /></svg>} />
                  <SectionTile label="Wind Load" icon={<svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 15h20c3 0 5 2 5 5s-2 5-5 5h-5M5 30h30c3 0 5 2 5 5s-2 5-5 5" /></svg>} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;