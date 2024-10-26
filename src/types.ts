export interface Project {
  id: number;
  title: string;
  address?: string;
  imageUrl: string;
  photoCount: number;
  lastUpdated: string;
  category?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  company: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'project' | 'team' | 'system';
  link?: string;
}

export interface Photo {
  id: number;
  url: string;
  date: Date;
  notes?: string;
}