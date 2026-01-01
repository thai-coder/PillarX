import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Search, Menu, Trash2, ArrowUpDown, X, Check } from 'lucide-react';
import { Project } from '../types';

interface ProjectTableProps {
  projects: Project[];
  onMenuClick: () => void;
  onProjectClick: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

type SortConfig = {
  key: keyof Project | null;
  direction: 'asc' | 'desc';
};

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onMenuClick, onProjectClick, onDeleteProject }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'dateModified', direction: 'desc' });
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string, x: number, y: number } | null>(null);

  const handleSort = (key: keyof Project) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredProjects = useMemo(() => {
    let result = projects.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue === undefined || bValue === undefined) return 0;

        if (sortConfig.key === 'dateModified') {
          return sortConfig.direction === 'asc' 
            ? new Date(aValue as string).getTime() - new Date(bValue as string).getTime()
            : new Date(bValue as string).getTime() - new Date(aValue as string).getTime();
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [projects, searchQuery, sortConfig]);

  const SortIcon = ({ columnKey }: { columnKey: keyof Project }) => {
    if (sortConfig.key !== columnKey) return <ArrowUpDown className="w-3 h-3 ml-2 text-gray-300" />;
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-3 h-3 ml-2 text-blue-600" /> 
      : <ChevronDown className="w-3 h-3 ml-2 text-blue-600" />;
  };

  const handleDeleteTrigger = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setDeleteConfirm({ 
      id: projectId, 
      x: rect.left - 120, 
      y: rect.top - 10 
    });
  };

  return (
    <div className="flex-1 p-6 md:p-12 md:ml-64 min-h-screen bg-white transition-all duration-300 relative">
      <div className="flex items-center gap-4 mb-10">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Projects</h2>
      </div>

      <div className="relative mb-10 max-w-sm">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
          placeholder="Search a Project"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="border border-gray-200 rounded-xl flex flex-col overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th 
                  scope="col" 
                  className="px-8 py-5 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">Project Name <SortIcon columnKey="name" /></div>
                </th>
                <th 
                  scope="col" 
                  className="px-8 py-5 text-center text-[11px] font-bold text-gray-500 uppercase tracking-widest cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleSort('componentsCount')}
                >
                  <div className="flex items-center justify-center">Components <SortIcon columnKey="componentsCount" /></div>
                </th>
                <th 
                  scope="col" 
                  className="px-8 py-5 text-center text-[11px] font-bold text-gray-500 uppercase tracking-widest cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleSort('dateModified')}
                >
                  <div className="flex items-center justify-center">Date Modified <SortIcon columnKey="dateModified" /></div>
                </th>
                <th scope="col" className="px-8 py-5 text-center text-[11px] font-bold text-gray-500 uppercase tracking-widest w-28">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {sortedAndFilteredProjects.length > 0 ? (
                sortedAndFilteredProjects.map((project) => (
                  <tr 
                    key={project.id} 
                    className="group hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={() => onProjectClick(project)}
                  >
                    <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-gray-700">
                      {project.name}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-500 text-center">
                      {project.componentsCount}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-sm font-medium text-gray-500 text-center">
                      {project.dateModified}
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-center">
                      <button 
                        onClick={(e) => handleDeleteTrigger(e, project.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1.5 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-sm text-gray-400 font-medium">No projects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteConfirm && (
        <div 
          className="fixed z-50 bg-white border border-gray-200 shadow-2xl rounded-xl p-4 flex flex-col gap-3 w-56 animate-in fade-in zoom-in-95 duration-200"
          style={{ top: deleteConfirm.y, left: deleteConfirm.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-sm font-bold text-gray-800">Delete Project?</span>
          <div className="flex items-center gap-2">
            <button onClick={(e) => { e.stopPropagation(); onDeleteProject(deleteConfirm.id); setDeleteConfirm(null); }} className="flex-1 py-1.5 px-3 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 flex items-center justify-center gap-1.5"><Check className="w-3.5 h-3.5" /> YES</button>
            <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm(null); }} className="flex-1 py-1.5 px-3 bg-gray-100 text-gray-800 text-xs font-bold rounded-lg hover:bg-gray-200 flex items-center justify-center gap-1.5"><X className="w-3.5 h-3.5" /> NO</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;