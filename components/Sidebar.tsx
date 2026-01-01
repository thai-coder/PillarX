import React from 'react';
import { Clock, Plus, History, X, LogOut } from 'lucide-react';
import { Project, ViewType } from '../types';

interface SidebarProps {
  recentProjects: Project[];
  onNewProject: () => void;
  onProjectClick: (project: Project) => void;
  onViewChange: (view: ViewType) => void;
  onLogout: () => void;
  activeView: ViewType;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  recentProjects, 
  onNewProject, 
  onProjectClick, 
  onViewChange, 
  onLogout,
  activeView,
  isOpen, 
  onClose 
}) => {
  const displayedRecents = recentProjects.slice(0, 5);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity" onClick={onClose} />
      )}

      <aside className={`
        fixed left-0 top-0 bottom-0 z-30 w-64 bg-white border-r border-gray-200 flex flex-col h-screen overflow-y-auto 
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="p-8 pb-4 flex justify-between items-start">
          <h1 className="text-xl font-semibold leading-relaxed text-gray-900">
            Welcome to PillarX,<br />
            <span className="text-gray-700">diweciv.</span>
          </h1>
          <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-900 p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="flex justify-center items-start">
            <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => { onNewProject(); onClose(); }}>
              <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-600 transition-colors">New</span>
              <div className="w-12 h-12 flex items-center justify-center border border-gray-400 rounded bg-white hover:bg-gray-50 hover:border-blue-600 transition-colors shadow-sm">
                <Plus className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-6 border-b border-gray-300 my-2"></div>

        <nav className="px-6 py-4 flex flex-col gap-1">
          <button 
            onClick={() => { onViewChange('all'); onClose(); }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeView !== 'activity' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Clock className="w-4 h-4" />
            Projects
          </button>
          <button 
            onClick={() => { onViewChange('activity'); onClose(); }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeView === 'activity' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <History className="w-4 h-4" />
            Activity Log
          </button>
        </nav>

        <div className="mx-6 border-b border-gray-300 my-2"></div>

        <div className="px-6 py-4 flex-1">
          <div className="flex items-center gap-3 mb-4 text-gray-800 font-medium text-sm">
            <span>Recent Projects</span>
          </div>
          <ul className="space-y-3 pl-1">
            {displayedRecents.map((project) => (
              <li 
                key={project.id} 
                className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer pl-4 truncate transition-colors border-l border-gray-200 hover:border-blue-400"
                onClick={() => { onProjectClick(project); onClose(); }}
              >
                {project.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 py-6 mt-auto">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg text-sm font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;