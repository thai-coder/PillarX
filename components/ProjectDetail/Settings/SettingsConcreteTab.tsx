
import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { ProjectSettings } from '../../../types';

interface SettingsConcreteTabProps {
  settings: ProjectSettings['concrete'];
  onChange: (key: keyof ProjectSettings['concrete'], value: any) => void;
}

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

const SettingsConcreteTab: React.FC<SettingsConcreteTabProps> = ({ settings, onChange }) => {
  return (
    <div className="flex flex-col">
      <ConcreteDropdownRow 
        label="Rebar Grade" 
        value={settings.rebarGrade} 
        options={['ASTM A615', 'ASTM A706', 'Grade 60']} 
        onChange={(v) => onChange('rebarGrade', v)} 
      />
      <ConcreteDropdownRow 
        label="Foundation Rebar Grade" 
        value={settings.foundationRebarGrade} 
        options={['ASTM A615', 'ASTM A706']} 
        onChange={(v) => onChange('foundationRebarGrade', v)} 
      />
      <ConcreteDropdownRow 
        label="Concrete Stress Options" 
        value={settings.stressOptions} 
        options={['Rectangular Stress Block', 'Whitney Stress Block', 'Parabolic-Rectangular']} 
        onChange={(v) => onChange('stressOptions', v)} 
      />
      
      <ConcreteRangeRow 
        label="Column Steel" 
        min={settings.columnSteelMin}
        max={settings.columnSteelMax}
        onMinChange={(v) => onChange('columnSteelMin', v)}
        onMaxChange={(v) => onChange('columnSteelMax', v)}
      />
      <ConcreteRangeRow 
        label="Drilled Pier Steel" 
        min={settings.drilledPierSteelMin}
        max={settings.drilledPierSteelMax}
        onMinChange={(v) => onChange('drilledPierSteelMin', v)}
        onMaxChange={(v) => onChange('drilledPierSteelMax', v)}
      />
      <ConcreteSingleInputRow 
        label="Pedestal Steel" 
        value={settings.pedestalSteel} 
        placeholder="Auto"
        onChange={(v) => onChange('pedestalSteel', v)} 
      />

      <div className="py-6 border-b border-gray-100">
        <ConcreteCheckboxRow 
          label="Use Cracked Sections" 
          checked={settings.useCrackedSections} 
          onChange={(v) => onChange('useCrackedSections', v)} 
        />
        <ConcreteCheckboxRow 
          label="Min 1 Bar Diameter Spacing" 
          checked={settings.minBarSpacing} 
          onChange={(v) => onChange('minBarSpacing', v)} 
        />
        <ConcreteCheckboxRow 
          label="Optimize for OTM/Sliding" 
          checked={settings.optimizeOTMSliding} 
          onChange={(v) => onChange('optimizeOTMSliding', v)} 
        />
      </div>

      <div className="flex items-center justify-between py-4">
        <label className="text-sm font-bold text-gray-800">Coefficient of Friction</label>
        <input 
          type="number" 
          step="0.1"
          value={settings.frictionCoefficient}
          onChange={(e) => onChange('frictionCoefficient', Number(e.target.value))}
          className="w-20 px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default SettingsConcreteTab;
