import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProjectPage from './components/ProjectPage';
import { ProjectProvider } from './context/ProjectContext';
import { UserProvider } from './context/UserContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <UserProvider>
        <NotificationProvider>
          <ProjectProvider>
            <div className="min-h-screen bg-gray-50">
              <Header onMenuClick={() => setIsSidebarOpen(true)} />
              <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
              
              <main className="lg:pl-64 pt-16">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/project/:id" element={<ProjectPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </ProjectProvider>
        </NotificationProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;