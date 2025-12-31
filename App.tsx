import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ProjectTable from './components/ProjectTable';
import NewProject from './components/NewProject';
import { MOCK_PROJECTS } from './constants';
import { Project } from './types';

function App() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  // In a real app, you might fetch data here
  useEffect(() => {
    // Simulate initial load or fetching
  }, []);

  const recentProjects = projects.filter(p => p.isRecent);

  const handleNewProject = () => {
    setIsNewProjectOpen(true);
  };

  const handleCloseNewProject = () => {
    setIsNewProjectOpen(false);
  };

  return (
    <div className="flex w-full min-h-screen bg-white">
      <Sidebar 
        recentProjects={recentProjects} 
        onNewProject={handleNewProject}
        onViewChange={(view) => console.log('View changed to', view)}
      />
      <main className="flex-1">
        <ProjectTable projects={projects} />
      </main>
      
      {isNewProjectOpen && <NewProject onClose={handleCloseNewProject} />}
    </div>
  );
}

export default App;