import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, HelpCircle } from 'lucide-react';
import { Project } from '../../types';

interface HeaderProps {
  project: Project;
  onBack: () => void;
  onSettingsOpen: () => void;
  onRenameProject: (newName: string) => void;
}

const Header: React.FC<HeaderProps> = ({ project, onBack, onSettingsOpen, onRenameProject }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(project.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(project.name);
  }, [project.name]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleBlur = () => {
    if (editValue.trim() && editValue !== project.name) {
      onRenameProject(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setEditValue(project.name);
      setIsEditing(false);
    }
  };

  return (
    <header className="bg-[#004e7c] text-white h-12 flex items-center justify-between px-4 shadow-sm z-20">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity" onClick={onBack}>
          <div className="bg-white/10 hover:bg-white/20 rounded-full p-1 transition-colors">
            <ChevronLeft className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">PillarX</span>
        </button>
        <div className="h-6 w-px bg-white/20 mx-2"></div>
        
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="bg-white/10 text-white font-medium text-blue-50 px-2 py-0.5 rounded border border-white/20 focus:outline-none focus:bg-white/20 text-sm"
          />
        ) : (
          <span 
            className="font-medium text-blue-50 cursor-pointer select-none hover:text-white transition-colors"
            onDoubleClick={handleDoubleClick}
            title="Double-click to rename"
          >
            {project.name}
          </span>
        )}
      </div>
      <div className="flex items-center gap-6 text-[13px] font-semibold">
        <button className="hover:text-blue-100 transition-colors">Feedback</button>
        <button onClick={onSettingsOpen} className="hover:text-blue-100 transition-colors">Settings</button>
        <button className="hover:text-blue-100 transition-colors">Projects</button>
        <button className="hover:text-blue-100 transition-colors"><HelpCircle className="w-5 h-5" /></button>
      </div>
    </header>
  );
};

export default Header;