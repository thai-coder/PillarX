
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ProjectSettings } from '../../../types';
import SettingsCodesTab from './SettingsCodesTab';
import SettingsConcreteTab from './SettingsConcreteTab';
import SettingsCompositeTab from './SettingsCompositeTab';
import SettingsUnitsTab from './SettingsUnitsTab';

interface SettingsModalProps {
  settings: ProjectSettings;
  onClose: () => void;
  onSave: (settings: ProjectSettings) => void;
}

type TabType = 'Codes' | 'Concrete' | 'Composite' | 'Units';

const SettingsModal: React.FC<SettingsModalProps> = ({ settings, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState<TabType>('Codes');
  const [localSettings, setLocalSettings] = useState<ProjectSettings>({ ...settings });

  const handleCodeChange = (key: keyof ProjectSettings['codes'], value: string) => {
    setLocalSettings({
      ...localSettings,
      codes: {
        ...localSettings.codes,
        [key]: value
      }
    });
  };

  const handleConcreteChange = (key: keyof ProjectSettings['concrete'], value: any) => {
    setLocalSettings({
      ...localSettings,
      concrete: {
        ...localSettings.concrete,
        [key]: value
      }
    });
  };

  const handleCompositeChange = (key: keyof ProjectSettings['composite'], value: any) => {
    setLocalSettings({
      ...localSettings,
      composite: {
        ...localSettings.composite,
        [key]: value
      }
    });
  };

  const handleUnitChange = (key: keyof ProjectSettings['units'], value: string) => {
    setLocalSettings({
      ...localSettings,
      units: {
        ...localSettings.units,
        [key]: value
      }
    });
  };

  const handleSystemToggle = (system: 'Imperial' | 'Metric') => {
    setLocalSettings({
      ...localSettings,
      unitSystem: system
    });
  };

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm transition-all animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden max-h-[90vh] md:h-[640px] animate-in zoom-in-95 duration-300">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row bg-gray-50 border-b border-gray-200 shrink-0">
          <div className="px-6 md:px-10 py-6 md:py-8 flex items-center bg-white md:border-r border-gray-200 min-w-0 md:min-w-[220px]">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Settings</h2>
          </div>
          <div className="flex-1 flex justify-between items-center pr-4 overflow-x-auto no-scrollbar">
            <div className="flex h-full min-w-max">
              {(['Codes', 'Concrete', 'Composite', 'Units'] as TabType[]).map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 md:px-8 h-full text-xs md:text-sm font-bold transition-all border-b-4 relative whitespace-nowrap pt-4 pb-3 md:pt-0 md:pb-0 ${
                    activeTab === tab 
                      ? 'text-blue-600 border-blue-600 bg-white' 
                      : 'text-gray-400 border-transparent hover:text-gray-700 hover:bg-white/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button 
              onClick={onClose}
              className="p-2 ml-2 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar bg-white">
          <div className="max-w-2xl mx-auto">
            {activeTab === 'Codes' && (
              <SettingsCodesTab 
                settings={localSettings.codes} 
                onChange={handleCodeChange} 
              />
            )}
            
            {activeTab === 'Concrete' && (
              <SettingsConcreteTab 
                settings={localSettings.concrete} 
                onChange={handleConcreteChange} 
              />
            )}

            {activeTab === 'Composite' && (
              <SettingsCompositeTab 
                settings={localSettings.composite} 
                onChange={handleCompositeChange} 
              />
            )}

            {activeTab === 'Units' && (
              <SettingsUnitsTab 
                settings={localSettings.units} 
                unitSystem={localSettings.unitSystem}
                onChange={handleUnitChange} 
                onSystemToggle={handleSystemToggle}
              />
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 md:p-8 border-t border-gray-100 flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 bg-gray-50 shrink-0">
          <button 
            onClick={onClose} 
            className="w-full sm:w-40 py-3 border-2 border-gray-800 text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all text-sm"
          >
            Close
          </button>
          <button 
            onClick={handleSave} 
            className="w-full sm:w-40 py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition-all shadow-lg text-sm"
          >
            Ok
          </button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
};

export default SettingsModal;
