import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NewProjectProps {
  onClose: () => void;
}

const NewProject: React.FC<NewProjectProps> = ({ onClose }) => {
  const [projectName, setProjectName] = useState('Project 2');

  const SectionTile = ({ label, icon }: { label: string; icon: React.ReactNode }) => (
    <div className="flex flex-col items-center gap-3 cursor-pointer group">
      <div className="w-24 h-24 border border-gray-400 rounded-lg flex items-center justify-center bg-white group-hover:border-blue-600 group-hover:shadow-md transition-all">
        {icon}
      </div>
      <span className="text-sm text-gray-900 font-medium">{label}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-8 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-10">New Project</h1>

          {/* Project Name Input */}
          <div className="flex items-center gap-4 mb-12">
            <label className="text-sm font-bold text-gray-900 min-w-[100px]">Project Name:</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-white border border-gray-800 rounded-sm px-3 py-1.5 w-64 text-sm text-gray-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-900">Choose Component:</h2>
          </div>

          <div className="space-y-12">
            {/* Building Structure Elements */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-40 flex-shrink-0 pt-2">
                <h3 className="text-sm font-bold text-gray-500 leading-tight">
                  Building<br />Structure<br />Elements
                </h3>
              </div>
              <div className="flex flex-wrap gap-8">
                <SectionTile 
                  label="Beam" 
                  icon={
                    <svg width="60" height="30" viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                      <path d="M5 15h50" />
                      <path d="M5 15l-3 6h6z" fill="white" />
                      <path d="M55 15l-3 6h6z" fill="white" />
                      <path d="M2 22h6" />
                      <path d="M52 22h6" />
                    </svg>
                  } 
                />
                <SectionTile 
                  label="Column" 
                  icon={
                    <svg width="30" height="60" viewBox="0 0 30 60" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                      <path d="M15 5v45" />
                      <path d="M15 5l4 4" />
                      <path d="M15 5l-4 4" />
                      <path d="M10 50l5 -5l5 5z" fill="white" />
                      <path d="M5 50h20" />
                      <path d="M5 52l20 0" strokeDasharray="2 2" />
                    </svg>
                  } 
                />
                <SectionTile 
                  label="Steel Joist" 
                  icon={
                     <svg width="60" height="30" viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                      <rect x="5" y="8" width="50" height="14" />
                      <path d="M5 22L15 8L25 22L35 8L45 22L55 8" />
                    </svg>
                  } 
                />
                <SectionTile 
                  label="Composite Beam" 
                  icon={
                     <svg width="60" height="40" viewBox="0 0 60 40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                      {/* Concrete slab */}
                      <rect x="5" y="5" width="50" height="8" fill="rgba(0,0,0,0.05)" />
                      <path d="M5 10h50" strokeDasharray="1 2" strokeOpacity="0.5" />
                      {/* I Beam */}
                      <path d="M20 13h20" />
                      <path d="M30 13v15" />
                      <path d="M20 28h20" />
                    </svg>
                  } 
                />
              </div>
            </div>

            {/* Foundation Elements */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-40 flex-shrink-0 pt-2">
                <h3 className="text-sm font-bold text-gray-500 leading-tight">
                  Foundation<br />Elements
                </h3>
              </div>
              <div className="flex flex-wrap gap-8">
                <SectionTile 
                  label="Retaining Wall" 
                  icon={
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                      <path d="M20 10v30h15" />
                      <path d="M20 25l-10 10" />
                      <path d="M5 35h40" />
                    </svg>
                  } 
                />
                <SectionTile 
                  label="Spread Footing" 
                  icon={
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                       <rect x="20" y="10" width="10" height="15" />
                       <rect x="10" y="25" width="30" height="10" />
                       <path d="M5 30h40" opacity="0.3" />
                    </svg>
                  } 
                />
                <SectionTile 
                  label="Wall Footing" 
                  icon={
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                       <path d="M25 10v15" />
                       <rect x="15" y="25" width="20" height="10" />
                       <path d="M25 10l-5 5" />
                       <path d="M25 10l5 5" />
                    </svg>
                  } 
                />
                <SectionTile 
                  label="Drilled Pier" 
                  icon={
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                       <path d="M5 20h40" />
                       <rect x="20" y="20" width="10" height="20" />
                       <line x1="15" y1="25" x2="35" y2="25" strokeDasharray="2 2" />
                    </svg>
                  } 
                />
              </div>
            </div>

            {/* Load Generators */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-40 flex-shrink-0 pt-2">
                <h3 className="text-sm font-bold text-gray-500 leading-tight">
                  Load<br />Generators
                </h3>
              </div>
              <div className="flex flex-wrap gap-8">
                <SectionTile 
                  label="Seismic Load" 
                  icon={
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                      <path d="M5 25h5l5-10l10 20l10-20l5 10h5" />
                    </svg>
                  } 
                />
                <SectionTile 
                  label="Wind Load" 
                  icon={
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600">
                       <path d="M10 15h20c3 0 5 2 5 5s-2 5-5 5h-5" />
                       <path d="M5 30h30c3 0 5 2 5 5s-2 5-5 5" />
                       <path d="M15 25h-5" />
                    </svg>
                  } 
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;