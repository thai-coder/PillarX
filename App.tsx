import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ProjectTable from './components/ProjectTable';
import NewProject from './components/NewProject';
import ProjectDetail from './components/ProjectDetail';
import ActivityLog from './components/ActivityLog';
import Auth from './components/Auth';
import { MOCK_PROJECTS } from './constants';
import { Project, User, UserActivity, ViewType, ProjectComponent } from './types';
import { detectActor } from './utils/detector';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeView, setActiveView] = useState<ViewType>('all');
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { actorType } = detectActor();

  // Unified Initialization Logic (Auto-Login)
  useEffect(() => {
    const initApp = async () => {
      try {
        // Restore Session
        const savedUser = localStorage.getItem('pillarx_current_user');
        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
        }

        // Restore Data
        const savedProjects = localStorage.getItem('pillarx_projects');
        if (savedProjects) {
          setProjects(JSON.parse(savedProjects));
        }

        const savedActivities = localStorage.getItem('pillarx_activities');
        if (savedActivities) {
          setActivities(JSON.parse(savedActivities));
        }
      } catch (error) {
        console.error("Failed to initialize session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initApp();
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('pillarx_projects', JSON.stringify(projects));
    }
  }, [projects, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('pillarx_activities', JSON.stringify(activities));
    }
  }, [activities, isLoading]);

  const trackActivity = (type: string, detail: string) => {
    const newActivity: UserActivity = {
      id: Date.now().toString(),
      user_id: currentUser?.id,
      action_type: type,
      action_detail: detail,
      ip_address: '127.0.0.1',
      user_agent: navigator.userAgent,
      actor_type: actorType,
      created_at: new Date().toISOString()
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('pillarx_current_user', JSON.stringify(user));
    trackActivity('LOGIN_SUCCESS', `User session established for ${user.email}`);
  };

  const handleLogout = () => {
    trackActivity('LOGOUT', 'User signed out manually');
    setCurrentUser(null);
    localStorage.removeItem('pillarx_current_user');
  };

  const handleNewProject = () => {
    setIsNewProjectOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleCreateProject = (name: string, componentType: string) => {
    const now = new Date();
    const formattedDate = `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear()}`;
    
    const initialComponent: ProjectComponent = {
      id: `c_${Date.now()}`,
      type: componentType,
      name: `${componentType} 1`,
      quantity: 1
    };

    const newProject: Project = {
      id: Date.now().toString(),
      name,
      componentsCount: 1,
      components: [initialComponent],
      dateModified: formattedDate,
      isRecent: true,
    };

    setProjects([newProject, ...projects]);
    setIsNewProjectOpen(false);
    setActiveProject(newProject);
    trackActivity('CREATE_PROJECT', `Project "${name}" created with component ${componentType}`);
  };

  const handleProjectClick = (project: Project) => {
    setActiveProject(project);
    trackActivity('VIEW_PROJECT', `Opened project: ${project.name}`);
  };

  const handleDeleteProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    setProjects(projects.filter(p => p.id !== projectId));
    trackActivity('DELETE_PROJECT', `Deleted project: ${project?.name || projectId}`);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    setActiveProject(updatedProject);
    trackActivity('UPDATE_PROJECT', `Updated project structure: ${updatedProject.name}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#005a8d] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">PillarX Loading...</span>
      </div>
    );
  }

  if (!currentUser) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  if (activeProject) {
    return (
      <ProjectDetail 
        project={activeProject} 
        onBack={() => setActiveProject(null)} 
        onUpdateProject={handleUpdateProject}
      />
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-white relative">
      <Sidebar 
        recentProjects={projects.filter(p => p.isRecent)} 
        onNewProject={handleNewProject}
        onProjectClick={handleProjectClick}
        onViewChange={setActiveView}
        onLogout={handleLogout}
        activeView={activeView}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <main className="flex-1 w-full">
        {activeView === 'activity' ? (
          <ActivityLog activities={activities} />
        ) : (
          <ProjectTable 
            projects={projects} 
            onMenuClick={() => setIsMobileMenuOpen(true)}
            onProjectClick={handleProjectClick}
            onDeleteProject={handleDeleteProject}
          />
        )}
      </main>
      
      {isNewProjectOpen && (
        <NewProject 
          onClose={() => setIsNewProjectOpen(false)} 
          onCreate={handleCreateProject}
          defaultName={`Project ${projects.length + 1}`}
        />
      )}
    </div>
  );
}

export default App;