import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewProjectModal({ isOpen, onClose }: Props) {
  const { addProject } = useProjects();
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProject(formData);
    onClose();
    setFormData({
      title: '',
      address: '',
      category: 'Commercial',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">New Project</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Title
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.address}
                onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.category}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
              >
                <option>Commercial</option>
                <option>Residential</option>
                <option>Industrial</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}