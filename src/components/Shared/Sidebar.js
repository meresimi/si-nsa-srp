import React from 'react';
import { MapPin, Users, BookOpen, X } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: MapPin },
    { id: 'localities', name: 'Locality Details', icon: MapPin },
    { id: 'individuals', name: 'Basic Information', icon: Users },
    { id: 'childrenClasses', name: "Children's Classes", icon: BookOpen },
    { id: 'juniorYouthGroups', name: 'Junior Youth Groups', icon: Users },
    { id: 'studyCircles', name: 'Study Circles', icon: BookOpen }
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-0'} bg-gray-900 text-white transition-all duration-300 overflow-hidden`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">SI-NSA SRP</h2>
          <button onClick={onClose} className="lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id);
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${
                activeView === item.id ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;