import React, { useState, useMemo } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';
import { Project, ProjectComponent, ProjectSettings } from '../../types';
import Header from './Header';
import Sidebar from './Sidebar';
import AddComponentModal from '../AddComponentModal';
import SettingsModal from './Settings/SettingsModal';
import { getComponentDefinition } from './TypeRegistry';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onUpdateProject: (project: Project) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onUpdateProject }) => {
  const [activeComponentId, setActiveComponentId] = useState<string>(project.components[0]?.id || '');
  const [isAddComponentOpen, setIsAddComponentOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  const [componentData, setComponentData] = useState<any>({
    length: 10,
    wallHeight: 5,
    wallThickness: 12,
    toeLength: 2,
    heelLength: 4,
    footingThickness: 12,
    hasKey: true
  });

  const activeComponent = project.components.find(c => c.id === activeComponentId) || project.components[0];
  const definition = getComponentDefinition(activeComponent?.type || 'Default');

  const componentTypes = useMemo(() => {
    const types = new Set(project.components.map(c => c.type));
    return ['ALL', ...Array.from(types)];
  }, [project.components]);

  const filteredComponents = useMemo(() => {
    let list = [...project.components];
    if (filterType !== 'ALL') {
      list = list.filter(c => c.type === filterType);
    }
    return list;
  }, [project.components, filterType]);

  const updateTimestamp = () => {
    const now = new Date();
    return `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear()}`;
  };

  const handleAddComponent = (type: string) => {
    const newComponent: ProjectComponent = {
      id: `c_${Date.now()}`,
      type,
      name: `${type} ${project.components.filter(c => c.type === type).length + 1}`,
      quantity: 1
    };

    onUpdateProject({
      ...project,
      components: [...project.components, newComponent],
      componentsCount: project.componentsCount + 1,
      dateModified: updateTimestamp()
    });
    setActiveComponentId(newComponent.id);
    setIsAddComponentOpen(false);
  };

  const handleRename = (id: string, name: string) => {
    const updatedComponents = project.components.map(c => 
      c.id === id ? { ...c, name } : c
    );
    onUpdateProject({ ...project, components: updatedComponents, dateModified: updateTimestamp() });
  };

  const handleProjectRename = (newName: string) => {
    onUpdateProject({ ...project, name: newName, dateModified: updateTimestamp() });
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (project.components.length <= 1) return;
    const updated = project.components.filter(c => c.id !== id);
    onUpdateProject({ ...project, components: updated, componentsCount: updated.length, dateModified: updateTimestamp() });
    if (activeComponentId === id) setActiveComponentId(updated[0].id);
  };

  const handleDuplicate = (e: React.MouseEvent, comp: ProjectComponent) => {
    e.stopPropagation();
    const newComp = { ...comp, id: `c_${Date.now()}`, name: `${comp.name} (Copy)` };
    onUpdateProject({ ...project, components: [...project.components, newComp], componentsCount: project.componentsCount + 1, dateModified: updateTimestamp() });
  };

  const handleUpdateSettings = (newSettings: ProjectSettings) => {
    onUpdateProject({
      ...project,
      settings: newSettings,
      dateModified: updateTimestamp()
    });
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
      <Header 
        project={project} 
        onBack={onBack} 
        onSettingsOpen={() => setIsSettingsOpen(true)}
        onRenameProject={handleProjectRename}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          components={filteredComponents}
          activeComponentId={activeComponentId}
          collapsed={leftSidebarCollapsed}
          filterType={filterType}
          componentTypes={componentTypes}
          onAddComponent={() => setIsAddComponentOpen(true)}
          onSelectComponent={setActiveComponentId}
          onFilterChange={setFilterType}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
          onRename={handleRename}
        />

        <main className="flex-1 bg-white relative flex flex-col min-w-0">
          <button 
            onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
            className="absolute top-4 left-4 z-20 w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all border-b-2"
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
          >
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`text-gray-600 transition-transform ${rightSidebarCollapsed ? 'rotate-180' : ''}`}>
               <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
               <line x1="16" y1="3" x2="16" y2="21" strokeWidth="2" />
             </svg>
          </button>
          
          <div className="text-center pt-8 pb-4">
             <h2 className="text-gray-900 text-xl font-bold">{activeComponent?.name}</h2>
             <div className="text-[11px] text-blue-600 font-bold flex items-center justify-center gap-1 cursor-pointer mt-1 hover:underline">
               All Loads | View <ChevronDown className="w-3 h-3" />
             </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-8 overflow-hidden relative">
            <definition.Visualizer data={componentData} />
          </div>
        </main>

        <aside className={`
          bg-white border-l border-gray-200 flex flex-col shadow-2xl z-10 transition-all duration-300 ease-in-out overflow-hidden
          ${rightSidebarCollapsed ? 'w-0 opacity-0 invisible' : 'w-80 opacity-100'}
        `}>
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Component:</span>
            <div className="flex items-center gap-2 font-bold text-sm text-gray-900 group cursor-pointer">
              {activeComponent?.name} <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-900" />
            </div>
          </div>

          <div className="flex border-b border-gray-200 bg-gray-50/50 overflow-x-auto whitespace-nowrap custom-scrollbar">
            <button className="flex-shrink-0 px-4 py-3 text-[11px] font-bold text-blue-600 border-b-2 border-blue-600 bg-white uppercase tracking-wider">General Properties</button>
            <button className="flex-shrink-0 px-4 py-3 text-[11px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider">Soil</button>
            <button className="flex-shrink-0 px-4 py-3 text-[11px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider">Reinforcement</button>
            <button className="flex-shrink-0 px-4 py-3 text-[11px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider">Loads</button>
          </div>

          <div className="flex px-6 pt-5 pb-2 gap-6">
             <button className="text-[13px] font-bold text-gray-900 border-b-2 border-blue-600 pb-1">Geometry</button>
             <button className="text-[13px] font-bold text-gray-400 hover:text-gray-600 pb-1">Properties</button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
             <definition.Properties onUpdate={setComponentData} />
          </div>

          <div className="p-6 border-t border-gray-100 bg-white">
            <button className="w-full py-2.5 bg-white border border-gray-900 text-gray-900 rounded-full font-bold hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors shadow-sm text-sm">
              <CheckCircle className="w-4 h-4" /> Solve
            </button>
          </div>
        </aside>
      </div>

      {isAddComponentOpen && (
        <AddComponentModal onClose={() => setIsAddComponentOpen(false)} onAdd={handleAddComponent} />
      )}

      {isSettingsOpen && (
        <SettingsModal 
          settings={project.settings} 
          onClose={() => setIsSettingsOpen(false)} 
          onSave={handleUpdateSettings} 
        />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default ProjectDetail;