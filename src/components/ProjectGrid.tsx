import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Camera } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';

export default function ProjectGrid() {
  const { filteredProjects } = useProjects();

  if (filteredProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Camera size={48} className="mb-4 opacity-50" />
        <p className="text-lg">No projects found</p>
        <p className="text-sm">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {filteredProjects.map((project) => (
        <Link
          key={project.id}
          to={`/project/${project.id}`}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group cursor-pointer"
        >
          <div className="relative h-48">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-semibold text-lg">{project.title}</h3>
              <div className="flex items-center text-white/90 text-sm mt-1">
                <MapPin size={14} className="mr-1" />
                {project.address}
              </div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between border-t border-gray-100">
            <div className="flex items-center text-gray-600">
              <Camera size={16} className="mr-1" />
              <span className="text-sm">{project.photoCount} photos</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock size={16} className="mr-1" />
              <span className="text-sm">{project.lastUpdated}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}