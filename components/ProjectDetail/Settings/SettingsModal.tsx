
import React, { useState } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';
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

const ConcreteDropdownRow = ({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
    <label className="text-sm font-bold text-gray-800">{label}</label>
    <div className="relative w-48">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm border border-transparent bg-transparent pr-8 py-1 focus:outline-none focus:text-blue-600 font-medium appearance-none text-right"
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-900">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  </div>
);

const ConcreteRangeRow = ({ label, min, max, onMinChange, onMaxChange }: { label: string, min: number, max: number, onMinChange: (v: number) => void, onMaxChange: (v: number) => void }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100">
    <label className="text-sm font-bold text-gray-800">{label}</label>
    <div className="flex gap-4">
      <div className="flex flex-col items-start">
        <span className="text-[10px] text-gray-400 font-bold mb-1 ml-1">Min</span>
        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
          <input 
            type="number" 
            value={min} 
            onChange={(e) => onMinChange(Number(e.target.value))}
            className="w-12 px-2 py-1 text-sm focus:outline-none text-center" 
          />
          <div className="bg-gray-50 px-2 py-1 border-l border-gray-300 text-[10px] font-bold text-blue-600 flex items-center">%</div>
        </div>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-[10px] text-gray-400 font-bold mb-1 ml-1">Max</span>
        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
          <input 
            type="number" 
            value={max} 
            onChange={(e) => onMaxChange(Number(e.target.value))}
            className="w-12 px-2 py-1 text-sm focus:outline-none text-center" 
          />
          <div className="bg-gray-50 px-2 py-1 border-l border-gray-300 text-[10px] font-bold text-blue-600 flex items-center">%</div>
        </div>
      </div>
    </div>
  </div>
);

const ConcreteSingleInputRow = ({ label, value, onChange, placeholder }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100">
    <label className="text-sm font-bold text-gray-800">{label}</label>
    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
      <input 
        type="text" 
        value={value} 
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 px-2 py-1 text-sm focus:outline-none text-center placeholder:text-gray-300" 
      />
      <div className="bg-gray-50 px-2 py-1 border-l border-gray-300 text-[10px] font-bold text-blue-600 flex items-center">%</div>
    </div>
  </div>
);

const ConcreteCheckboxRow = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) => (
  <div className="flex items-center gap-3 py-1.5 cursor-pointer select-none" onClick={() => onChange(!checked)}>
    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${checked ? 'bg-black border-black' : 'bg-white border-gray-300'}`}>
      {checked && <Check className="w-3 h-3 text-white" />}
    </div>
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </div>
);

// New Composite Tab Components
const CompositeUnitInput = ({ value, onChange, unit }: { value: number, onChange: (v: number) => void, unit: string }) => (
  <div className="flex items-center border border-gray-300 rounded overflow-hidden w-28">
    <input 
      type="number" 
      value={value} 
      onChange={(e) => onChange(Number(e.target.value))}
      className="flex-1 min-w-0 px-2 py-1.5 text-sm focus:outline-none text-center font-medium" 
    />
    <div className="bg-gray-50 px-2 py-1.5 border-l border-gray-300 text-[11px] font-bold text-[#005a8d] flex items-center min-w-[2.5rem] justify-center">{unit}</div>
  </div>
);

// New Units Tab Components
const UnitSelectRow = ({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) => (
  <div className="flex items-center justify-between mb-4">
    <label className="text-sm font-bold text-gray-900">{label}</label>
    <div className="relative w-64">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm border border-gray-300 rounded-sm px-3 py-1.5 bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium transition-all"
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
              <div className="space-y-1 md:space-y-2">
                <CodeSelectRow 
                  label="Hot Rolled Steel" 
                  value={localSettings.codes.hotRolledSteel}
                  onChange={(v) => handleCodeChange('hotRolledSteel', v)}
                  options={['AISC 15th (360-16): LRFD', 'AISC 14th (360-10): LRFD', 'AISC 15th (360-16): ASD']}
                />
                <CodeSelectRow 
                  label="Composite Steel Beam" 
                  value={localSettings.codes.compositeSteelBeam}
                  onChange={(v) => handleCodeChange('compositeSteelBeam', v)}
                  options={['AISC 15th (360-16): LRFD', 'AISC 14th (360-10): LRFD']}
                />
                <CodeSelectRow 
                  label="Cold Formed Steel" 
                  value={localSettings.codes.coldFormedSteel}
                  onChange={(v) => handleCodeChange('coldFormedSteel', v)}
                  options={['AISI S100-20: LRFD', 'AISI S100-16: LRFD']}
                />
                <CodeSelectRow 
                  label="Concrete Beam/Column" 
                  value={localSettings.codes.concreteBeamColumn}
                  onChange={(v) => handleCodeChange('concreteBeamColumn', v)}
                  options={['ACI 318-19', 'ACI 318-14']}
                />
                <CodeSelectRow 
                  label="Concrete Foundations" 
                  value={localSettings.codes.concreteFoundations}
                  onChange={(v) => handleCodeChange('concreteFoundations', v)}
                  options={['ACI 318-19', 'ACI 318-14', 'ACI 318-11']}
                />
                <CodeSelectRow 
                  label="Concrete Drilled Pier" 
                  value={localSettings.codes.concreteDrilledPier}
                  onChange={(v) => handleCodeChange('concreteDrilledPier', v)}
                  options={['ACI 318-19', 'ACI 318-14']}
                />
                <CodeSelectRow 
                  label="Wood" 
                  value={localSettings.codes.wood}
                  onChange={(v) => handleCodeChange('wood', v)}
                  options={['AWC NDS-18: ASD', 'AWC NDS-15: ASD']}
                />
                <CodeSelectRow 
                  label="Masonry" 
                  value={localSettings.codes.masonry}
                  onChange={(v) => handleCodeChange('masonry', v)}
                  options={['TMS 402-16: ASD', 'TMS 402-13: ASD']}
                />
                <CodeSelectRow 
                  label="Aluminum" 
                  value={localSettings.codes.aluminum}
                  onChange={(v) => handleCodeChange('aluminum', v)}
                  options={['AA ADM1-20: LRFD - Building', 'AA ADM1-15: LRFD']}
                />
                <CodeSelectRow 
                  label="Stainless Steel" 
                  value={localSettings.codes.stainlessSteel}
                  onChange={(v) => handleCodeChange('stainlessSteel', v)}
                  options={['AISC 14th (360-10): LRFD', 'AISC 15th (360-16): LRFD']}
                />
                <CodeSelectRow 
                  label="Steel Joist" 
                  value={localSettings.codes.steelJoist}
                  onChange={(v) => handleCodeChange('steelJoist', v)}
                  options={['SJI 43rd/44th Edition: ASD', 'SJI 43rd/44th Edition: LRFD']}
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
            
            {activeTab === 'Concrete' && (
              <div className="flex flex-col">
                <ConcreteDropdownRow 
                  label="Rebar Grade" 
                  value={localSettings.concrete.rebarGrade} 
                  options={['ASTM A615', 'ASTM A706', 'Grade 60']} 
                  onChange={(v) => handleConcreteChange('rebarGrade', v)} 
                />
                <ConcreteDropdownRow 
                  label="Foundation Rebar Grade" 
                  value={localSettings.concrete.foundationRebarGrade} 
                  options={['ASTM A615', 'ASTM A706']} 
                  onChange={(v) => handleConcreteChange('foundationRebarGrade', v)} 
                />
                <ConcreteDropdownRow 
                  label="Concrete Stress Options" 
                  value={localSettings.concrete.stressOptions} 
                  options={['Rectangular Stress Block', 'Whitney Stress Block', 'Parabolic-Rectangular']} 
                  onChange={(v) => handleConcreteChange('stressOptions', v)} 
                />
                
                <ConcreteRangeRow 
                  label="Column Steel" 
                  min={localSettings.concrete.columnSteelMin}
                  max={localSettings.concrete.columnSteelMax}
                  onMinChange={(v) => handleConcreteChange('columnSteelMin', v)}
                  onMaxChange={(v) => handleConcreteChange('columnSteelMax', v)}
                />
                <ConcreteRangeRow 
                  label="Drilled Pier Steel" 
                  min={localSettings.concrete.drilledPierSteelMin}
                  max={localSettings.concrete.drilledPierSteelMax}
                  onMinChange={(v) => handleConcreteChange('drilledPierSteelMin', v)}
                  onMaxChange={(v) => handleConcreteChange('drilledPierSteelMax', v)}
                />
                <ConcreteSingleInputRow 
                  label="Pedestal Steel" 
                  value={localSettings.concrete.pedestalSteel} 
                  placeholder="Auto"
                  onChange={(v) => handleConcreteChange('pedestalSteel', v)} 
                />

                <div className="py-6 border-b border-gray-100">
                  <ConcreteCheckboxRow 
                    label="Use Cracked Sections" 
                    checked={localSettings.concrete.useCrackedSections} 
                    onChange={(v) => handleConcreteChange('useCrackedSections', v)} 
                  />
                  <ConcreteCheckboxRow 
                    label="Min 1 Bar Diameter Spacing" 
                    checked={localSettings.concrete.minBarSpacing} 
                    onChange={(v) => handleConcreteChange('minBarSpacing', v)} 
                  />
                  <ConcreteCheckboxRow 
                    label="Optimize for OTM/Sliding" 
                    checked={localSettings.concrete.optimizeOTMSliding} 
                    onChange={(v) => handleConcreteChange('optimizeOTMSliding', v)} 
                  />
                </div>

                <div className="flex items-center justify-between py-4">
                  <label className="text-sm font-bold text-gray-800">Coefficient of Friction</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={localSettings.concrete.frictionCoefficient}
                    onChange={(e) => handleConcreteChange('frictionCoefficient', Number(e.target.value))}
                    className="w-20 px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'Composite' && (
              <div className="flex flex-col">
                {/* Column Headers */}
                <div className="flex items-center justify-end gap-10 mb-2 pr-4">
                  <span className="text-sm font-bold text-gray-800 w-28 text-center">Min</span>
                  <span className="text-sm font-bold text-gray-800 w-28 text-center">Max</span>
                </div>

                <div className="flex items-center justify-between py-6 border-b border-gray-100">
                  <label className="text-sm font-bold text-gray-800">% Composite</label>
                  <div className="flex gap-10">
                    <CompositeUnitInput 
                      value={localSettings.composite.percentCompositeMin} 
                      onChange={(v) => handleCompositeChange('percentCompositeMin', v)} 
                      unit="%" 
                    />
                    <CompositeUnitInput 
                      value={localSettings.composite.percentCompositeMax} 
                      onChange={(v) => handleCompositeChange('percentCompositeMax', v)} 
                      unit="%" 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-6 border-b border-gray-100">
                  <label className="text-sm font-bold text-gray-800">Stud Spacing</label>
                  <div className="flex gap-10">
                    <CompositeUnitInput 
                      value={localSettings.composite.studSpacingMin} 
                      onChange={(v) => handleCompositeChange('studSpacingMin', v)} 
                      unit="in" 
                    />
                    <CompositeUnitInput 
                      value={localSettings.composite.studSpacingMax} 
                      onChange={(v) => handleCompositeChange('studSpacingMax', v)} 
                      unit="in" 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-6 border-b border-gray-100">
                  <label className="text-sm font-bold text-gray-800">Min Flange Width for 2 Rows</label>
                  <div className="flex justify-end pr-[9.5rem]">
                    <CompositeUnitInput 
                      value={localSettings.composite.minFlangeWidth2Rows} 
                      onChange={(v) => handleCompositeChange('minFlangeWidth2Rows', v)} 
                      unit="in" 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-6 border-b border-gray-100">
                  <label className="text-sm font-bold text-gray-800">Min Flange Width for 3 Rows</label>
                  <div className="flex justify-end pr-[9.5rem]">
                    <CompositeUnitInput 
                      value={localSettings.composite.minFlangeWidth3Rows} 
                      onChange={(v) => handleCompositeChange('minFlangeWidth3Rows', v)} 
                      unit="in" 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-6">
                  <label className="text-sm font-bold text-gray-800">I-effective (% of I-equivalent)</label>
                  <div className="flex justify-end pr-[9.5rem]">
                    <CompositeUnitInput 
                      value={localSettings.composite.iEffective} 
                      onChange={(v) => handleCompositeChange('iEffective', v)} 
                      unit="%" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Units' && (
              <div className="flex flex-col">
                {/* System Toggles */}
                <div className="flex gap-4 mb-8">
                  <button 
                    onClick={() => setLocalSettings({...localSettings, unitSystem: 'Imperial'})}
                    className={`px-6 py-2 rounded-full text-xs font-bold border-2 transition-all ${
                      localSettings.unitSystem === 'Imperial' 
                        ? 'border-gray-900 text-gray-900 bg-white' 
                        : 'border-gray-200 text-gray-400 bg-white'
                    }`}
                  >
                    Imperial
                  </button>
                  <button 
                    onClick={() => setLocalSettings({...localSettings, unitSystem: 'Metric'})}
                    className={`px-6 py-2 rounded-full text-xs font-bold border-2 transition-all ${
                      localSettings.unitSystem === 'Metric' 
                        ? 'border-gray-900 text-gray-900 bg-white' 
                        : 'border-gray-200 text-gray-400 bg-white'
                    }`}
                  >
                    Metric
                  </button>
                </div>

                {/* Units List */}
                <div className="space-y-0.5">
                  <UnitSelectRow label="Length" value={localSettings.units.length} options={['ft', 'm', 'cm']} onChange={(v) => handleUnitChange('length', v)} />
                  <UnitSelectRow label="Dimensions" value={localSettings.units.dimensions} options={['in', 'mm', 'cm']} onChange={(v) => handleUnitChange('dimensions', v)} />
                  <UnitSelectRow label="Material Stiffness" value={localSettings.units.materialStiffness} options={['ksi', 'GPa', 'MPa']} onChange={(v) => handleUnitChange('materialStiffness', v)} />
                  <UnitSelectRow label="Weight Densities" value={localSettings.units.weightDensities} options={['k/ft³', 'pcf', 'kg/m³']} onChange={(v) => handleUnitChange('weightDensities', v)} />
                  <UnitSelectRow label="Forces" value={localSettings.units.forces} options={['k', 'lb', 'kN']} onChange={(v) => handleUnitChange('forces', v)} />
                  <UnitSelectRow label="Linear Forces" value={localSettings.units.linearForces} options={['klf', 'plf', 'kN/m']} onChange={(v) => handleUnitChange('linearForces', v)} />
                  <UnitSelectRow label="Moments" value={localSettings.units.moments} options={['k-ft', 'lb-in', 'kN-m']} onChange={(v) => handleUnitChange('moments', v)} />
                  <UnitSelectRow label="Linear Moments" value={localSettings.units.linearMoments} options={['k-ft/ft', 'kN-m/m']} onChange={(v) => handleUnitChange('linearMoments', v)} />
                  <UnitSelectRow label="Surface/Area Loads" value={localSettings.units.surfaceAreaLoads} options={['ksf', 'psf', 'kPa']} onChange={(v) => handleUnitChange('surfaceAreaLoads', v)} />
                  <UnitSelectRow label="Deflections" value={localSettings.units.deflections} options={['in', 'mm']} onChange={(v) => handleUnitChange('deflections', v)} />
                  <UnitSelectRow label="Stresses" value={localSettings.units.stresses} options={['ksi', 'psi', 'MPa']} onChange={(v) => handleUnitChange('stresses', v)} />
                  <UnitSelectRow label="Area/length" value={localSettings.units.areaLength} options={['', 'in²/ft', 'cm²/m']} onChange={(v) => handleUnitChange('areaLength', v)} />
                  <UnitSelectRow label="Area" value={localSettings.units.area} options={['ft²', 'in²', 'm²', 'cm²']} onChange={(v) => handleUnitChange('area', v)} />
                </div>
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
