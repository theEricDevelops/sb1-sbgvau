import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Camera, Trash2, Download, Upload, FileText, 
  MapPin, Calendar, Edit2, X, Check 
} from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { format, parseISO } from 'date-fns';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ProjectReport from './ProjectReport';
import { Photo } from '../types';

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, updateProject } = useProjects();
  const project = projects.find(p => p.id === Number(id));
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);
  const [photos, setPhotos] = useState<Photo[]>([]);

  // Initialize photos once when component mounts
  useEffect(() => {
    if (project) {
      setPhotos([{ 
        id: 1, 
        url: project.imageUrl, 
        date: parseISO(project.lastUpdated), 
        notes: 'Initial site photo' 
      }]);
    }
  }, [project?.id]); // Only run when project ID changes

  // Update photo count when photos array changes
  useEffect(() => {
    if (project && photos.length !== project.photoCount) {
      updateProject(project.id, { photoCount: photos.length });
    }
  }, [photos.length, project?.id, updateProject]);

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Project not found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-blue-600 hover:text-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotos(prev => [...prev, {
            id: Date.now(),
            url: reader.result as string,
            date: new Date(),
            notes: ''
          }]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeletePhoto = (photoId: number) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  const handleSaveChanges = () => {
    if (editedProject) {
      updateProject(project.id, editedProject);
      setIsEditing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="relative h-64">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex justify-between items-end">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProject?.title}
                    onChange={e => setEditedProject({ ...editedProject!, title: e.target.value })}
                    className="text-3xl font-bold text-white bg-transparent border-b border-white/50 focus:outline-none focus:border-white"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-white">{project.title}</h1>
                )}
                {(project.address || isEditing) && (
                  <div className="flex items-center text-white/90 mt-2">
                    <MapPin size={16} className="mr-1" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProject?.address || ''}
                        onChange={e => setEditedProject({ ...editedProject!, address: e.target.value })}
                        placeholder="Add address (optional)"
                        className="bg-transparent border-b border-white/50 focus:outline-none focus:border-white"
                      />
                    ) : (
                      project.address
                    )}
                  </div>
                )}
              </div>
              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white"
                    >
                      <X size={20} />
                    </button>
                    <button
                      onClick={handleSaveChanges}
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white"
                    >
                      <Check size={20} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white"
                  >
                    <Edit2 size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                <Calendar size={16} className="inline mr-1" />
                Last updated: {format(parseISO(project.lastUpdated), 'MMM d, yyyy')}
              </span>
              <span className="text-sm text-gray-500">
                <Camera size={16} className="inline mr-1" />
                {photos.length} photos
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <PDFDownloadLink
                document={<ProjectReport project={project} photos={photos} />}
                fileName={`${project.title}-report.pdf`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FileText size={16} className="mr-2" />
                Export PDF
              </PDFDownloadLink>
              <label className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
                <Upload size={16} className="mr-2" />
                Upload Photos
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map(photo => (
              <div key={photo.id} className="group relative">
                <img
                  src={photo.url}
                  alt=""
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-3">
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                  <a
                    href={photo.url}
                    download
                    className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                  >
                    <Download size={16} />
                  </a>
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-500">
                    {format(photo.date, 'MMM d, yyyy')}
                  </div>
                  {photo.notes && (
                    <div className="text-sm text-gray-700 mt-1">{photo.notes}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}