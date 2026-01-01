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
  <div className="flex items-center justify-between gap-6 mb-4">
    <label className="text-sm font-bold text-gray-600 w-1/2 text-right">{label}:</label>
    <div className="relative w-1/2">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2 bg-gray-50/50 appearance-none focus:ring-1 focus:ring-blue-500 font-medium"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col overflow-hidden h-[600px] animate-in zoom-in-95 duration-300">
        <div className="flex flex-col md:flex-row bg-gray-50 border-b border-gray-200">
          <div className="px-10 py-8 flex items-center bg-white border-r border-gray-200 min-w-[220px]">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Settings</h2>
          </div>
          <div className="flex-1 flex justify-between items-center pr-4">
            <div className="flex h-full">
              {(['Codes', 'Concrete', 'Composite', 'Units'] as TabType[]).map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 h-full text-sm font-bold transition-all border-b-4 relative ${
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
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-white">
          {activeTab === 'Codes' && (
            <div className="max-w-xl mx-auto space-y-3">
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
            <div className="max-w-xl mx-auto">
               <div className="flex items-center justify-between gap-6">
                <label className="text-sm font-bold text-gray-600 w-1/2 text-right">System of Units:</label>
                <div className="w-1/2">
                  <select 
                    value={localSettings.units}
                    onChange={(e) => setLocalSettings({...localSettings, units: e.target.value as 'Imperial' | 'Metric'})}
                    className="w-full text-sm border border-gray-200 rounded-lg px-4 py-2 bg-gray-50/50 appearance-none focus:ring-1 focus:ring-blue-500 font-medium"
                  >
                    <option value="Imperial">Imperial</option>
                    <option value="Metric">Metric</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'Codes' && activeTab !== 'Units' && (
            <div className="flex items-center justify-center h-full text-gray-300 italic py-20">
               Configuration for {activeTab} will appear here.
            </div>
          )}
        </div>

        <div className="p-8 border-t border-gray-100 flex justify-center gap-6 bg-gray-50">
          <button 
            onClick={onClose} 
            className="w-40 py-3 border-2 border-gray-800 text-gray-900 rounded font-bold hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="w-40 py-3 bg-gray-900 text-white rounded font-bold hover:bg-gray-800 transition-all shadow-lg"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;