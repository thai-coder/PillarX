import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { ProjectSettings } from '../../../types';

interface SettingsModalProps {
  settings: ProjectSettings;
  onClose: () => void;
  onSave: (settings: ProjectSettings) => void;
}

type TabType = 'Codes' | 'Concrete' | 'Composite' | 'Units';

const CodeSelectRow = ({ 
  label, 
  value, 
  onChange, 
  options 
}: { 
  label: string, 
  value: string, 
  onChange: (val: string) => void,
  options: string[] 
}) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-6 mb-4">
    <label className="text-sm font-bold text-gray-600 sm:w-1/2 sm:text-right">{label}:</label>
    <div className="relative w-full sm:w-1/2">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2 bg-gray-50/50 appearance-none focus:ring-1 focus:ring-blue-500 font-medium transition-all"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  </div>
);

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
          <div className="max-w-xl mx-auto">
            {activeTab === 'Codes' && (
              <div className="space-y-2 md:space-y-4">
                <CodeSelectRow 
                  label="Hot Rolled Steel" 
                  value={localSettings.codes.hotRolledSteel}
                  onChange={(v) => handleCodeChange('hotRolledSteel', v)}
                  options={['AISC 15th (360-16): LRFD', 'AISC 14th (360-10): LRFD', 'AISC 15th (360-16): ASD']}
                />
                <CodeSelectRow 
                  label="Concrete Foundations" 
                  value={localSettings.codes.concreteFoundations}
                  onChange={(v) => handleCodeChange('concreteFoundations', v)}
                  options={['ACI 318-19', 'ACI 318-14', 'ACI 318-11']}
                />
                <CodeSelectRow 
                  label="Seismic" 
                  value={localSettings.codes.seismic}
                  onChange={(v) => handleCodeChange('seismic', v)}
                  options={['ASCE 7-16', 'ASCE 7-10', 'ASCE 7-22']}
                />
                <CodeSelectRow 
                  label="Wind" 
                  value={localSettings.codes.wind}
                  onChange={(v) => handleCodeChange('wind', v)}
                  options={['ASCE 7-16', 'ASCE 7-10', 'ASCE 7-22']}
                />
              </div>
            )}
            
            {activeTab === 'Units' && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-6">
                <label className="text-sm font-bold text-gray-600 sm:w-1/2 sm:text-right">System of Units:</label>
                <div className="relative w-full sm:w-1/2">
                  <select 
                    value={localSettings.units}
                    onChange={(e) => setLocalSettings({...localSettings, units: e.target.value as 'Imperial' | 'Metric'})}
                    className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2 bg-gray-50/50 appearance-none focus:ring-1 focus:ring-blue-500 font-medium transition-all"
                  >
                    <option value="Imperial">Imperial</option>
                    <option value="Metric">Metric</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'Codes' && activeTab !== 'Units' && (
              <div className="flex items-center justify-center h-full text-gray-400 italic py-20 text-center text-sm">
                 Configuration parameters for {activeTab} will be available in the next version.
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 md:p-8 border-t border-gray-100 flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 bg-gray-50 shrink-0">
          <button 
            onClick={onClose} 
            className="w-full sm:w-40 py-3 border-2 border-gray-800 text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-all text-sm"
          >
            Cancel
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
      `}} />
    </div>
  );
};

export default SettingsModal;