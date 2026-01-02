import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { ProjectComponent } from '../../types';

interface MiddlePanelProps {
  activeComponent: ProjectComponent;
  selectedLoadView: string;
  isLoadViewOpen: boolean;
  setIsLoadViewOpen: (open: boolean) => void;
  loadViewDropdownRef: React.RefObject<HTMLDivElement | null>;
  onSelectView: (view: string) => void;
  componentData: any;
  definition: any;
  leftSidebarCollapsed: boolean;
  setLeftSidebarCollapsed: (v: boolean) => void;
  rightSidebarCollapsed: boolean;
  setRightSidebarCollapsed: (v: boolean) => void;
}

const MiddlePanel: React.FC<MiddlePanelProps> = ({ 
  activeComponent, 
  selectedLoadView, 
  isLoadViewOpen, 
  setIsLoadViewOpen, 
  loadViewDropdownRef, 
  onSelectView,
  componentData,
  definition,
  leftSidebarCollapsed,
  setLeftSidebarCollapsed,
  rightSidebarCollapsed,
  setRightSidebarCollapsed
}) => {
  const DropdownItem = ({ label, isSubItem = false }: { label: string; isSubItem?: boolean }) => {
    const isSelected = selectedLoadView === label;
    return (
      <div 
        onClick={() => onSelectView(label)}
        className={`px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center transition-colors ${isSubItem ? 'pl-12' : ''}`}
      >
        <div className="w-6 flex-shrink-0">
          {isSelected && <Check className="w-4 h-4 text-gray-900" />}
        </div>
        <span className={`text-[13px] ${isSelected ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
          {label}
        </span>
      </div>
    );
  };

  return (
    <main className="flex-1 bg-white relative flex flex-col min-w-0">
      {/* Sidebar Toggle Controls */}
      <button 
        onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
        className="absolute top-4 left-4 z-20 w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all border-b-2"
        title={leftSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`text-gray-600 transition-transform ${leftSidebarCollapsed ? 'rotate-180' : ''}`}>
           <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
           <line x1="7" y1="8" x2="17" y2="8" strokeWidth="2" />
           <line x1="7" y1="12" x2="17" y2="12" strokeWidth="2" />
           <line x1="7" y1="16" x2="17" y2="16" strokeWidth="2" />
         </svg>
      </button>

      <button 
        onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
        className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all border-b-2"
        title={rightSidebarCollapsed ? "Expand Attributes" : "Collapse Attributes"}
      >
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`text-gray-600 transition-transform ${rightSidebarCollapsed ? 'rotate-180' : ''}`}>
           <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
           <line x1="16" y1="3" x2="16" y2="21" strokeWidth="2" />
         </svg>
      </button>
      
      {/* Component Title and Load View Selection */}
      <div className="text-center pt-8 pb-4 relative z-10">
         <h2 className="text-gray-900 text-xl font-bold uppercase tracking-tight">{activeComponent?.name}</h2>
         <div className="relative inline-block" ref={loadViewDropdownRef}>
            <button 
              onClick={() => setIsLoadViewOpen(!isLoadViewOpen)}
              className="text-[11px] text-blue-600 font-bold flex items-center justify-center gap-1 cursor-pointer mt-1 hover:underline uppercase tracking-wider"
            >
              {selectedLoadView === 'Show All Loads' || selectedLoadView === 'Show None' ? 'All Loads' : selectedLoadView} | View <ChevronDown className={`w-3 h-3 transition-transform ${isLoadViewOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLoadViewOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden text-left z-50 animate-in fade-in zoom-in-95 duration-200">
                <DropdownItem label="Show None" />
                
                <div className="border-t border-gray-100">
                  <div className="px-4 pt-3 pb-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Load Category
                  </div>
                  <DropdownItem label="Show All Loads" />
                </div>

                <div className="border-t border-gray-100">
                  <div className="px-4 pt-3 pb-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Load Combinations
                  </div>
                  <DropdownItem label="1.4 DL" isSubItem />
                  <DropdownItem label="1 DL" isSubItem />
                </div>

                <div className="border-t border-gray-100">
                  <div className="px-4 pt-3 pb-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Deflection Load Combinations
                  </div>
                  <DropdownItem label="DL = DL" isSubItem />
                  <DropdownItem label="DL+LL = DL" isSubItem />
                </div>
              </div>
            )}
         </div>
      </div>

      {/* Main Visualization Area */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-hidden relative">
        <definition.Visualizer data={componentData} />
      </div>
    </main>
  );
};

export default MiddlePanel;