import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Project, ProjectComponent, ProjectSettings } from '../../types';
import Header from './Header';
import AddComponentModal from '../AddComponentModal';
import SettingsModal from './Settings/SettingsModal';
import { getComponentDefinition } from './TypeRegistry';

// Import split panels
import LeftPanel from './LeftPanel';
import MiddlePanel from './MiddlePanel';
import RightPanel from './RightPanel';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onUpdateProject: (project: Project) => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack, onUpdateProject }) => {
  // --- STATE ---
  const [activeComponentId, setActiveComponentId] = useState<string>(project.components[0]?.id || '');
  const [isAddComponentOpen, setIsAddComponentOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  const [isLoadViewOpen, setIsLoadViewOpen] = useState(false);
  const [selectedLoadView, setSelectedLoadView] = useState('Show All Loads');
  const loadViewDropdownRef = useRef<HTMLDivElement>(null);
  
  // Shared data for current active component (dimensions, etc)
  const [componentData, setComponentData] = useState<any>({
    length: 20,
    width: 12,
    depth: 24,
    wallHeight: 5,
    wallThickness: 12,
    toeLength: 2,
    heelLength: 4,
    footingThickness: 12,
    hasKey: true
  });

  // --- EFFECTS ---
  // Handle clicking outside of the load view dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (loadViewDropdownRef.current && !loadViewDropdownRef.current.contains(event.target as Node)) {
        setIsLoadViewOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- MEMOIZED DATA ---
  const activeComponent = useMemo(() => 
    project.components.find(c => c.id === activeComponentId) || project.components[0]
  , [project.components, activeComponentId]);

  const definition = useMemo(() => 
    getComponentDefinition(activeComponent?.type || 'Default')
  , [activeComponent]);

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

  // --- HANDLERS ---
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
    <div className="flex flex-col h-screen w-full bg-white overflow-hidden text-slate-900">
      <Header 
        project={project} 
        onBack={onBack} 
        onSettingsOpen={() => setIsSettingsOpen(true)}
        onRenameProject={handleProjectRename}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* LEFT PART: COMPONENT LIST & FILTERING */}
        <LeftPanel 
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

        {/* MIDDLE PART: VISUALIZATION & LOAD VIEW SELECTION */}
        <MiddlePanel 
          activeComponent={activeComponent}
          selectedLoadView={selectedLoadView}
          isLoadViewOpen={isLoadViewOpen}
          setIsLoadViewOpen={setIsLoadViewOpen}
          loadViewDropdownRef={loadViewDropdownRef}
          onSelectView={(v) => { setSelectedLoadView(v); setIsLoadViewOpen(false); }}
          componentData={componentData}
          definition={definition}
          leftSidebarCollapsed={leftSidebarCollapsed}
          setLeftSidebarCollapsed={setLeftSidebarCollapsed}
          rightSidebarCollapsed={rightSidebarCollapsed}
          setRightSidebarCollapsed={setRightSidebarCollapsed}
        />

        {/* RIGHT PART: COMPONENT ATTRIBUTES & PROPERTIES */}
        <RightPanel 
          activeComponent={activeComponent}
          definition={definition}
          onUpdateData={setComponentData}
          rightSidebarCollapsed={rightSidebarCollapsed}
        />
      </div>

      {/* Modals */}
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