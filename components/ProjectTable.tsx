import React, { useState, useMemo } from 'react';
import { AlignJustify, Home, Folder, ChevronDown, ChevronUp, Search, Menu, Trash2, ArrowUpDown, X, Check } from 'lucide-react';
import { Project, ViewType } from '../types';

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
    if (sortConfig.key !== columnKey) return <ArrowUpDown className="w-3 h-3 ml-1 text-gray-300" />;
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-3 h-3 ml-1 text-blue-600" /> 
      : <ChevronDown className="w-3 h-3 ml-1 text-blue-600" />;
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

  const confirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (deleteConfirm) {
      onDeleteProject(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirm(null);
  };

  return (
    <div className="flex-1 p-6 md:p-12 md:ml-64 min-h-screen bg-white transition-all duration-300 relative">
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

      <div className="border border-gray-300 rounded-lg flex flex-col overflow-hidden shadow-sm">
        <div className="flex-1 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50/50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-4 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Project Name
                      <SortIcon columnKey="name" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-4 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('componentsCount')}
                  >
                    <div className="flex items-center justify-center">
                      Components
                      <SortIcon columnKey="componentsCount" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-4 text-right text-[11px] font-bold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('dateModified')}
                  >
                    <div className="flex items-center justify-end">
                      Date Modified
                      <SortIcon columnKey="dateModified" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider w-24">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {sortedAndFilteredProjects.length > 0 ? (
                  sortedAndFilteredProjects.map((project) => (
                    <tr 
                      key={project.id} 
                      className="group hover:bg-blue-50/30 transition-colors cursor-pointer"
                    >
                      <td 
                        className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-800"
                        onClick={() => onProjectClick(project)}
                      >
                        {project.name}
                      </td>
                      <td 
                        className="px-6 py-5 whitespace-nowrap text-sm text-gray-600 text-center"
                        onClick={() => onProjectClick(project)}
                      >
                        {project.componentsCount}
                      </td>
                      <td 
                        className="px-6 py-5 whitespace-nowrap text-sm text-gray-600 text-right"
                        onClick={() => onProjectClick(project)}
                      >
                        {project.dateModified}
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-center text-sm">
                        <button 
                          onClick={(e) => handleDeleteTrigger(e, project.id)}
                          className="text-gray-300 hover:text-red-600 transition-colors p-2"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                      No projects found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Localized Delete Confirmation */}
      {deleteConfirm && (
        <div 
          className="fixed z-50 bg-white border border-gray-200 shadow-xl rounded-lg p-3 flex flex-col gap-2 w-48 animate-in fade-in zoom-in duration-200"
          style={{ top: deleteConfirm.y, left: deleteConfirm.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-xs font-bold text-gray-800">Delete Project?</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={confirmDelete}
              className="flex-1 py-1 px-2 bg-red-600 text-white text-[10px] font-bold rounded hover:bg-red-700 flex items-center justify-center gap-1"
            >
              <Check className="w-3 h-3" /> YES
            </button>
            <button 
              onClick={cancelDelete}
              className="flex-1 py-1 px-2 bg-gray-100 text-gray-800 text-[10px] font-bold rounded hover:bg-gray-200 flex items-center justify-center gap-1"
            >
              <X className="w-3 h-3" /> NO
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;