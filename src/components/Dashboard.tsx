import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import ProjectGrid from './ProjectGrid';
import NewProjectModal from './NewProjectModal';
import { useProjects } from '../context/ProjectContext';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeFilter, setActiveFilter } = useProjects();
  const filters = ['All', 'Commercial', 'Residential', 'Industrial'];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and organize your project photos</p>
        </div>
        
        <div className="flex space-x-4">
          <div className="relative">
            <button 
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => document.getElementById('filter-menu')?.classList.toggle('hidden')}
            >
              <Filter size={16} className="mr-2" />
              {activeFilter}
            </button>
            
            <div 
              id="filter-menu"
              className="hidden absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
            >
              <div className="py-1">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      document.getElementById('filter-menu')?.classList.add('hidden');
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      activeFilter === filter ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus size={16} className="mr-2" />
            New Project
          </button>
        </div>
      </div>
      
      <ProjectGrid />
      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}