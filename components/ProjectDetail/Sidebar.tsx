import React, { useRef, useState, useEffect } from 'react';
import { Plus, ChevronDown, Copy, Trash2, Check } from 'lucide-react';
import { ProjectComponent } from '../../types';

interface SidebarProps {
  components: ProjectComponent[];
  activeComponentId: string;
  collapsed: boolean;
  filterType: string;
  componentTypes: string[];
  onAddComponent: () => void;
  onSelectComponent: (id: string) => void;
  onFilterChange: (type: string) => void;
  onDuplicate: (e: React.MouseEvent, comp: ProjectComponent) => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
  onRename: (id: string, name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  components,
  activeComponentId,
  collapsed,
  filterType,
  componentTypes,
  onAddComponent,
  onSelectComponent,
  onFilterChange,
  onDuplicate,
  onDelete,
  onRename
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const startRenaming = (e: React.MouseEvent, comp: ProjectComponent) => {
    e.stopPropagation();
    setEditingId(comp.id);
    setEditingName(comp.name);
    setTimeout(() => editInputRef.current?.focus(), 0);
  };

  const handleSave = () => {
    if (editingId && editingName.trim()) {
      onRename(editingId, editingName.trim());
    }
    setEditingId(null);
  };

  const filterOptions = [
    'ALL',
    'Beam',
    'Column',
    'Steel Joist',
    'Composite Beam',
    'Retaining Wall',
    'Spread Footing',
    'Wall Footing',
    'Drilled Pier'
  ];

  return (
    <aside className={`
      bg-white border-r border-gray-200 flex flex-col z-10 transition-all duration-300 ease-in-out relative
      ${collapsed ? 'w-0 overflow-hidden opacity-0 invisible' : 'w-64 opacity-100'}
    `}>
      <div className="p-4 border-b border-gray-200 flex items-center gap-2">
        <button 
          onClick={onAddComponent}
          className="flex-1 py-2 flex items-center justify-center gap-2 text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 border border-gray-800 rounded transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Component
        </button>
      </div>
      
      <div className="p-2 bg-gray-50/80 border-b border-gray-200 flex justify-between items-center px-4 relative h-10">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">List:</span>
        
        <div className="flex-1 flex justify-end" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 text-[11px] font-bold text-gray-900 bg-transparent border-none focus:outline-none cursor-pointer uppercase py-1"
          >
            {filterType}
            <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150 rounded-b-lg">
              <div className="max-h-[300px] overflow-y-auto custom-dropdown-scrollbar">
                {filterOptions.map((option) => (
                  <div 
                    key={option}
                    onClick={() => {
                      onFilterChange(option);
                      setIsDropdownOpen(false);
                    }}
                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between ${
                      filterType === option 
                        ? 'bg-blue-50 text-blue-700 font-semibold' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{option}</span>
                    {filterType === option && <Check className="w-3.5 h-3.5" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
         {components.map((comp) => (
           <div 
             key={comp.id}
             onClick={() => onSelectComponent(comp.id)}
             onDoubleClick={(e) => startRenaming(e, comp)}
             className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-colors border-l-4 group relative ${
               activeComponentId === comp.id 
                ? 'bg-blue-50 border-[#004e7c] text-[#004e7c]' 
                : 'border-transparent hover:bg-gray-50 text-gray-600'
             }`}
           >
             <div className={activeComponentId === comp.id ? 'text-[#004e7c]' : 'text-gray-300'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <path d="M4 20h16" />
                   <path d="M12 4v16" />
                </svg>
             </div>
             <div className="flex-1 min-w-0">
                {editingId === comp.id ? (
                  <input
                    ref={editInputRef}
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    className="text-sm font-bold bg-white border border-blue-400 rounded px-1 w-full focus:outline-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span className="text-sm font-bold truncate block">{comp.name}</span>
                )}
             </div>
             <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={(e) => onDuplicate(e, comp)} className="p-1 hover:text-blue-600" title="Duplicate"><Copy className="w-3.5 h-3.5" /></button>
                <button onClick={(e) => onDelete(e, comp.id)} className="p-1 hover:text-red-600" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
             </div>
           </div>
         ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-dropdown-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-dropdown-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-dropdown-scrollbar::-webkit-scrollbar-thumb {
          background: #64748b;
          border-radius: 0px;
        }
        .custom-dropdown-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}} />
    </aside>
  );
};

export default Sidebar;