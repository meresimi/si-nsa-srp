import React, { useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import Header from '../Shared/Header';

const MainLayout = ({ children, activeView, setActiveView, onExport }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onMenuToggle={toggleSidebar} 
          onExport={onExport}
        />
        
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;