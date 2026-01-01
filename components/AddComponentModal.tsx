import React from 'react';
import { X } from 'lucide-react';

interface AddComponentModalProps {
  onClose: () => void;
  onAdd: (type: string) => void;
}

const SectionTile = ({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) => (
  <div 
    className="flex flex-col items-center gap-2 cursor-pointer group w-28"
    onClick={onClick}
  >
    <div className="w-24 h-24 border border-gray-200 rounded-xl flex items-center justify-center bg-white group-hover:border-blue-600 group-hover:shadow-lg transition-all">
      <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
        {icon}
      </div>
    </div>
    <span className="text-[11px] text-gray-700 font-bold text-center tracking-tight leading-tight w-full break-words px-1 uppercase">
      {label}
    </span>
  </div>
);

const AddComponentModal: React.FC<AddComponentModalProps> = ({ onClose, onAdd }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl relative overflow-hidden flex flex-col max-h-[85vh]">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 z-20 p-2"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="p-10 overflow-y-auto custom-scrollbar flex-1">
          <h1 className="text-2xl font-extrabold text-[#111827] mb-10 tracking-tight">CHOOSE COMPONENT:</h1>

          <div className="space-y-16">
            {/* Building Structure Elements */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-44 flex-shrink-0 pt-2">
                <h3 className="text-[11px] font-extrabold text-gray-400 leading-tight uppercase tracking-widest">
                  Building<br />Structure<br />Elements
                </h3>
              </div>
              <div className="flex-1 flex flex-wrap gap-8">
                <SectionTile 
                  label="Beam" 
                  onClick={() => onAdd("Beam")}
                  icon={<svg width="40" height="2" viewBox="0 0 40 2" className="text-gray-900"><line x1="0" y1="1" x2="40" y2="1" stroke="currentColor" strokeWidth="2" /></svg>} 
                />
                <SectionTile 
                  label="Column" 
                  onClick={() => onAdd("Column")}
                  icon={<svg width="2" height="40" viewBox="0 0 2 40" className="text-gray-900"><line x1="1" y1="0" x2="1" y2="40" stroke="currentColor" strokeWidth="2" /></svg>} 
                />
                <SectionTile 
                  label="Steel Joist" 
                  onClick={() => onAdd("Steel Joist")}
                  icon={<svg width="50" height="20" viewBox="0 0 60 30" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="8" width="50" height="14" /><path d="M5 22L15 8L25 22L35 8L45 22L55 8" /></svg>} 
                />
                <SectionTile 
                  label="Composite Beam" 
                  onClick={() => onAdd("Composite Beam")}
                  icon={<svg width="50" height="30" viewBox="0 0 60 40" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="5" width="50" height="8" fill="currentColor" fillOpacity="0.1" /><path d="M20 13h20M30 13v15M20 28h20" /></svg>} 
                />
              </div>
            </div>

            {/* Foundation Elements */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-44 flex-shrink-0 pt-2">
                <h3 className="text-[11px] font-extrabold text-gray-400 leading-tight uppercase tracking-widest">
                  Foundation<br />Elements
                </h3>
              </div>
              <div className="flex-1 flex flex-wrap gap-8">
                <SectionTile 
                  label="Retaining Wall" 
                  onClick={() => onAdd("Retaining Wall")}
                  icon={<svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 10v30h15M20 25l-10 10M5 35h40" /></svg>} 
                />
                <SectionTile 
                  label="Spread Footing" 
                  onClick={() => onAdd("Spread Footing")}
                  icon={<svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="20" y="10" width="10" height="15" /><rect x="10" y="25" width="30" height="10" /></svg>} 
                />
                <SectionTile 
                  label="Wall Footing" 
                  onClick={() => onAdd("Wall Footing")}
                  icon={<svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M25 10v15"/><rect x="15" y="25" width="20" height="10" /></svg>} 
                />
                <SectionTile 
                  label="Drilled Pier" 
                  onClick={() => onAdd("Drilled Pier")}
                  icon={<svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 20h40"/><rect x="20" y="20" width="10" height="20" /></svg>} 
                />
              </div>
            </div>

            {/* Load Section */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-44 flex-shrink-0 pt-2">
                <h3 className="text-[11px] font-extrabold text-gray-400 leading-tight uppercase tracking-widest">
                  LOAD
                </h3>
              </div>
              <div className="flex-1 flex flex-wrap gap-8">
                <SectionTile 
                  label="Seismic Load" 
                  onClick={() => onAdd("Seismic Load")}
                  icon={
                    <svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 25h5l5-10l10 20l10-20l5 10h5" />
                    </svg>
                  } 
                />
                <SectionTile 
                  label="Wind Load" 
                  onClick={() => onAdd("Wind Load")}
                  icon={
                    <svg width="40" height="40" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M10 25h30" />
                      <path d="M10 18h20c4 0 4 4 0 4h-5" />
                      <path d="M10 32h15c4 0 4 4 0 4h-5" />
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

export default AddComponentModal;