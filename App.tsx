import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ProjectTable from './components/ProjectTable';
import NewProject from './components/NewProject';
import ProjectDetail from './components/ProjectDetail';
import { MOCK_PROJECTS } from './constants';
import { Project } from './types';

function App() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // In a real app, you might fetch data here
  useEffect(() => {
    // Simulate initial load or fetching
  }, []);

  const recentProjects = projects.filter(p => p.isRecent);

  const handleNewProject = () => {
    setIsNewProjectOpen(true);
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  const handleCloseNewProject = () => {
    setIsNewProjectOpen(false);
  };

  const handleCreateProject = (name: string, componentType: string) => {
    const now = new Date();
    // Format: MM/DD/YYYY
    const formattedDate = `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear()}`;
    
    const newProject: Project = {
      id: Date.now().toString(),
      name: name,
      components: 1, // Start with 1 component as one is selected
      dateModified: formattedDate,
      isRecent: true,
      lastComponentType: componentType
    };

    setProjects([newProject, ...projects]);
    setIsNewProjectOpen(false);
    setActiveProject(newProject); // Immediately open the new project
  };

  const handleProjectClick = (project: Project) => {
    setActiveProject(project);
  };

  const handleBackToDashboard = () => {
    setActiveProject(null);
  };

  // If a project is active, show the detailed view
  if (activeProject) {
    return <ProjectDetail project={activeProject} onBack={handleBackToDashboard} />;
  }

  // Otherwise show the dashboard
  return (
    <div className="flex w-full min-h-screen bg-white relative">
      <Sidebar 
        recentProjects={recentProjects} 
        onNewProject={handleNewProject}
        onViewChange={(view) => console.log('View changed to', view)}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <main className="flex-1 w-full">
        <ProjectTable 
          projects={projects} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
          onProjectClick={handleProjectClick}
        />
      </main>
      
      {isNewProjectOpen && (
        <NewProject 
          onClose={handleCloseNewProject} 
          onCreate={handleCreateProject}
          defaultName={`Project ${projects.length + 1}`}
        />
      )}
    </div>
  );
}

export default App;