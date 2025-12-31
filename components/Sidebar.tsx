import React from 'react';
import { Clock, Plus, FolderOpen, Video, BookOpen, FileText, HelpCircle } from 'lucide-react';
import { Project } from '../types';

interface SidebarProps {
  recentProjects: Project[];
  onNewProject: () => void;
  onViewChange: (view: 'projects' | 'recents') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ recentProjects, onNewProject, onViewChange }) => {
  return (
    <aside className="w-64 bg-gray-50/50 border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0 overflow-y-auto z-10">
      {/* Header Greeting */}
      <div className="p-8 pb-4">
        <h1 className="text-xl font-semibold leading-relaxed text-gray-900">
          Welcome to RISACalc,<br />
          <span className="text-gray-700">diweciv.</span>
        </h1>
      </div>

      {/* Main Actions */}
      <div className="px-6 py-4">
        <div className="flex justify-between items-start gap-2">
          {/* Recent */}
          <div 
            className="flex flex-col items-center gap-2 group cursor-pointer"
            onClick={() => onViewChange('recents')}
          >
            <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-600">Recent</span>
            <div className="w-12 h-12 flex items-center justify-center border-2 border-gray-800 rounded-full bg-white hover:bg-gray-50 hover:border-blue-600 transition-colors">
              <Clock className="w-6 h-6 text-gray-800 group-hover:text-blue-600" />
            </div>
          </div>

          {/* New */}
          <div 
            className="flex flex-col items-center gap-2 group cursor-pointer"
            onClick={onNewProject}
          >
            <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-600">New</span>
            <div className="w-12 h-12 flex items-center justify-center border border-gray-400 rounded bg-white hover:bg-gray-50 hover:border-blue-600 transition-colors shadow-sm">
              <Plus className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
            </div>
          </div>

          {/* Projects */}
          <div 
            className="flex flex-col items-center gap-2 group cursor-pointer"
            onClick={() => onViewChange('projects')}
          >
            <span className="text-xs font-semibold text-gray-500 group-hover:text-blue-600">Projects</span>
            <div className="w-12 h-12 flex items-center justify-center border border-gray-400 rounded bg-white hover:bg-gray-50 hover:border-blue-600 transition-colors shadow-sm">
              <FolderOpen className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 border-b border-gray-300 my-2"></div>

      {/* Recents List */}
      <div className="px-6 py-6 flex-1">
        <div className="flex items-center gap-3 mb-4 text-gray-800 font-medium">
          <Clock className="w-5 h-5" />
          <span>Recents</span>
        </div>
        <ul className="space-y-3 pl-1">
          {recentProjects.map((project) => (
            <li key={project.id} className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer pl-7">
              {project.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div className="mx-6 border-b border-gray-300 my-2"></div>

      {/* Support Section */}
      <div className="px-6 py-6 pb-12">
        <h3 className="font-bold text-gray-900 mb-4">Support:</h3>
        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-gray-800 font-medium">
          <a href="#" className="hover:text-blue-600 flex items-center gap-1 group">
             Walkthrough Video
          </a>
          <a href="#" className="hover:text-blue-600 group">
             Overview
          </a>
          <a href="#" className="hover:text-blue-600 group">
             Release Notes
          </a>
          <a href="#" className="hover:text-blue-600 group">
             Help Library
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;