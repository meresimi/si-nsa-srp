import React from 'react';
import { Menu, Download } from 'lucide-react';

const Header = ({ onMenuToggle, onExport }) => {
  return (
    <div className="bg-white shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle} 
          className="p-2 hover:bg-gray-100 rounded lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold">SI-NSA SRP Data Collection</h1>
      </div>
      
      <button
        onClick={onExport}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Export</span>
      </button>
    </div>
  );
};

export default Header;