import React, { createContext, useContext, useState, useCallback } from 'react';
import { Project } from '../types';

interface ProjectContextType {
  projects: Project[];
  filteredProjects: Project[];
  searchTerm: string;
  activeFilter: string;
  setSearchTerm: (term: string) => void;
  setActiveFilter: (filter: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: number, updates: Partial<Project>) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const initialProjects: Project[] = [
  {
    id: 1,
    title: 'Downtown Renovation',
    address: '123 Main St, Austin, TX',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e',
    photoCount: 1,
    lastUpdated: new Date().toISOString(),
    category: 'Commercial'
  },
  {
    id: 2,
    title: 'Product Photography Session',
    imageUrl: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5',
    photoCount: 1,
    lastUpdated: new Date().toISOString(),
    category: 'Commercial'
  },
  {
    id: 3,
    title: 'Modern Office Complex',
    address: '789 Business Blvd, Houston, TX',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    photoCount: 1,
    lastUpdated: new Date().toISOString(),
    category: 'Commercial'
  }
];

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.address?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || project.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const addProject = useCallback((project: Omit<Project, 'id'>) => {
    const newProject = {
      ...project,
      id: projects.length + 1,
      lastUpdated: new Date().toISOString(),
      photoCount: 0
    };
    setProjects(prev => [...prev, newProject]);
  }, [projects]);

  const updateProject = useCallback((id: number, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id 
        ? { ...project, ...updates, lastUpdated: new Date().toISOString() }
        : project
    ));
  }, []);

  return (
    <ProjectContext.Provider value={{
      projects,
      filteredProjects,
      searchTerm,
      activeFilter,
      setSearchTerm,
      setActiveFilter,
      addProject,
      updateProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}