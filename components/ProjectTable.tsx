import React, { useState } from 'react';
import { AlignJustify, Home, Folder, ChevronDown, Search, Menu } from 'lucide-react';
import { Project, ViewType } from '../types';

interface ProjectTableProps {
  projects: Project[];
  onMenuClick: () => void;
  onProjectClick: (project: Project) => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onMenuClick, onProjectClick }) => {
  const [activeView, setActiveView] = useState<ViewType>('recents');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeView === 'recents') return p.isRecent;
    return true; // For 'all' and 'my_projects' showing all for demo
  });

  return (
    <div className="flex-1 p-6 md:p-12 md:ml-64 min-h-screen bg-white transition-all duration-300">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-500" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-400 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition duration-150 ease-in-out"
          placeholder="Search a Project"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Main Content Card */}
      <div className="border border-gray-800 rounded-lg flex flex-col md:flex-row min-h-[500px] overflow-hidden">
        
        {/* Card Sidebar */}
        <div className="w-full md:w-64 bg-gray-100/50 border-b md:border-b-0 md:border-r border-gray-300 flex-shrink-0">
          <div className="flex md:block overflow-x-auto md:overflow-visible py-2">
            <button
              onClick={() => setActiveView('recents')}
              className={`flex-1 md:w-full flex items-center justify-center md:justify-start gap-3 px-4 md:px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeView === 'recents' ? 'bg-gray-200/80 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <AlignJustify className="w-4 h-4" />
              Recents
            </button>
            <button
              onClick={() => setActiveView('all')}
              className={`flex-1 md:w-full flex items-center justify-center md:justify-start gap-3 px-4 md:px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeView === 'all' ? 'bg-gray-200/80 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="w-4 h-4" />
              All Projects
            </button>
            <button
              onClick={() => setActiveView('my_projects')}
              className={`flex-1 md:w-full flex items-center justify-center md:justify-start gap-3 px-4 md:px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeView === 'my_projects' ? 'bg-gray-200/80 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Folder className="w-4 h-4" />
              My Projects
            </button>
          </div>
        </div>

        {/* Card Content (Table) */}
        <div className="flex-1 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider w-1/2 min-w-[150px]">
                    Project Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider">
                    Components
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap">
                    Date Modified
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr 
                      key={project.id} 
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => onProjectClick(project)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {project.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                        {project.components}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {project.dateModified}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-sm text-gray-500">
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;