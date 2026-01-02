import React from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';
import { ProjectComponent } from '../../types';

interface RightPanelProps {
  activeComponent: ProjectComponent;
  definition: any;
  onUpdateData: (data: any) => void;
  rightSidebarCollapsed: boolean;
}

const RightPanel: React.FC<RightPanelProps> = ({ activeComponent, definition, onUpdateData, rightSidebarCollapsed }) => {
  return (
    <aside className={`
      bg-white border-l border-gray-200 flex flex-col shadow-2xl z-10 transition-all duration-300 ease-in-out overflow-hidden
      ${rightSidebarCollapsed ? 'w-0 opacity-0 invisible' : 'w-80 opacity-100'}
    `}>
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Component:</span>
        <div className="flex items-center gap-2 font-bold text-sm text-gray-900 group cursor-pointer uppercase tracking-tight">
          {activeComponent?.name} <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-900" />
        </div>
      </div>

      {/* Primary Category Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50/50 overflow-x-auto whitespace-nowrap custom-scrollbar">
        <button className="flex-shrink-0 px-4 py-3 text-[11px] font-bold text-blue-600 border-b-2 border-blue-600 bg-white uppercase tracking-wider">General Properties</button>
        <button className="flex-shrink-0 px-4 py-3 text-[11px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider">Soil</button>
        <button className="flex-shrink-0 px-4 py-3 text-[11px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider">Reinforcement</button>
        <button className="flex-shrink-0 px-4 py-3 text-[11px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider">Loads</button>
      </div>

      {/* Sub-Tabs for specific property groups */}
      <div className="flex px-6 pt-5 pb-2 gap-6">
         <button className="text-[13px] font-bold text-gray-900 border-b-2 border-blue-600 pb-1">Geometry</button>
         <button className="text-[13px] font-bold text-gray-400 hover:text-gray-600 pb-1">Properties</button>
      </div>

      {/* Property Input Area */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
         <definition.Properties onUpdate={onUpdateData} />
      </div>

      {/* Action Area: Solve/Analyze */}
      <div className="p-6 border-t border-gray-100 bg-white">
        <button className="w-full py-2.5 bg-white border border-gray-900 text-gray-900 rounded-full font-bold hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors shadow-sm text-sm uppercase tracking-widest">
          <CheckCircle className="w-4 h-4" /> Solve
        </button>
      </div>
    </aside>
  );
};

export default RightPanel;