import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ProjectSettings } from '../../../types';

interface SettingsUnitsTabProps {
  settings: ProjectSettings['units'];
  unitSystem: 'Imperial' | 'Metric';
  onChange: (key: keyof ProjectSettings['units'], value: string) => void;
  onSystemToggle: (system: 'Imperial' | 'Metric') => void;
}

const IMPERIAL_DEFAULTS: Record<keyof ProjectSettings['units'], string> = {
  length: 'ft',
  dimensions: 'in',
  materialStiffness: 'ksi',
  weightDensities: 'k/ft³',
  forces: 'k',
  linearForces: 'klf',
  moments: 'k-ft',
  linearMoments: 'k-ft/ft',
  surfaceAreaLoads: 'ksf',
  deflections: 'in',
  stresses: 'ksi',
  areaLength: 'in²/ft',
  area: 'ft²',
};

const METRIC_DEFAULTS: Record<keyof ProjectSettings['units'], string> = {
  length: 'm',
  dimensions: 'mm',
  materialStiffness: 'MPa',
  weightDensities: 'kg/m³',
  forces: 'kN',
  linearForces: 'kN/m',
  moments: 'kN-m',
  linearMoments: 'kN-m/m',
  surfaceAreaLoads: 'kPa',
  deflections: 'mm',
  stresses: 'MPa',
  areaLength: 'in²/ft',
  area: 'm²',
};

const UnitSelectRow = ({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) => (
  <div className="flex items-center justify-between mb-4 pr-1">
    <label className="text-[17px] font-normal text-gray-800">{label}</label>
    <div className="relative w-[320px]">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-[17px] border border-gray-300 rounded-sm px-3 py-1 bg-white appearance-none focus:outline-none font-normal text-gray-900 transition-all pr-10"
      >
        <option value={value}>{value}</option>
        {options.filter(o => o !== value).map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <ChevronDown className="w-5 h-5 opacity-40" />
      </div>
    </div>
  </div>
);

const SettingsUnitsTab: React.FC<SettingsUnitsTabProps> = ({ 
  settings, 
  unitSystem, 
  onChange, 
  onSystemToggle 
}) => {
  const handleToggle = (system: 'Imperial' | 'Metric') => {
    // 1. Update the system state first
    onSystemToggle(system);
    
    // 2. We must update the units. 
    // Due to the parent's state management potentially having stale closure issues 
    // when multiple calls are made in the same tick, we use small timeouts 
    // to ensure each update is processed against the previous one.
    const defaults = system === 'Imperial' ? IMPERIAL_DEFAULTS : METRIC_DEFAULTS;
    
    Object.entries(defaults).forEach(([key, value], index) => {
      setTimeout(() => {
        onChange(key as keyof ProjectSettings['units'], value);
      }, (index + 1) * 10); // Sequential 10ms delays
    });
  };

  return (
    <div className="flex flex-col pr-4">
      {/* System Toggles */}
      <div className="flex gap-6 mb-10">
        <button 
          onClick={() => handleToggle('Imperial')}
          className={`px-8 py-1.5 rounded-full text-sm font-medium border transition-all ${
            unitSystem === 'Imperial' 
              ? 'border-gray-900 text-gray-900 bg-white' 
              : 'border-gray-200 text-gray-400 bg-white'
          }`}
        >
          Imperial
        </button>
        <button 
          onClick={() => handleToggle('Metric')}
          className={`px-8 py-1.5 rounded-full text-sm font-medium border transition-all ${
            unitSystem === 'Metric' 
              ? 'bg-[#3da9fc] text-white border-[#3da9fc]' 
              : 'border-gray-200 text-gray-400 bg-white'
          }`}
        >
          Metric
        </button>
      </div>

      {/* Units List */}
      <div className="flex flex-col">
        <UnitSelectRow label="Length" value={settings.length} options={['ft', 'm', 'cm', 'in']} onChange={(v) => onChange('length', v)} />
        <UnitSelectRow label="Dimensions" value={settings.dimensions} options={['in', 'mm', 'cm', 'ft']} onChange={(v) => onChange('dimensions', v)} />
        <UnitSelectRow label="Material Stiffness" value={settings.materialStiffness} options={['ksi', 'GPa', 'MPa', 'psi']} onChange={(v) => onChange('materialStiffness', v)} />
        <UnitSelectRow label="Weight Densities" value={settings.weightDensities} options={['k/ft³', 'pcf', 'kg/m³', 'kN/m³']} onChange={(v) => onChange('weightDensities', v)} />
        <UnitSelectRow label="Forces" value={settings.forces} options={['k', 'lb', 'kN', 'N']} onChange={(v) => onChange('forces', v)} />
        <UnitSelectRow label="Linear Forces" value={settings.linearForces} options={['klf', 'plf', 'kN/m', 'N/m']} onChange={(v) => onChange('linearForces', v)} />
        <UnitSelectRow label="Moments" value={settings.moments} options={['k-ft', 'lb-in', 'kN-m', 'N-m']} onChange={(v) => onChange('moments', v)} />
        <UnitSelectRow label="Linear Moments" value={settings.linearMoments} options={['k-ft/ft', 'kN-m/m', 'N-m/m']} onChange={(v) => onChange('linearMoments', v)} />
        <UnitSelectRow label="Surface/Area Loads" value={settings.surfaceAreaLoads} options={['ksf', 'psf', 'kPa', 'N/m²']} onChange={(v) => onChange('surfaceAreaLoads', v)} />
        <UnitSelectRow label="Deflections" value={settings.deflections} options={['in', 'mm', 'cm']} onChange={(v) => onChange('deflections', v)} />
        <UnitSelectRow label="Stresses" value={settings.stresses} options={['ksi', 'psi', 'MPa', 'kPa']} onChange={(v) => onChange('stresses', v)} />
        <UnitSelectRow label="Area/length" value={settings.areaLength} options={['in²/ft', 'cm²/m', 'mm²/m']} onChange={(v) => onChange('areaLength', v)} />
        <UnitSelectRow label="Area" value={settings.area} options={['ft²', 'in²', 'm²', 'cm²']} onChange={(v) => onChange('area', v)} />
      </div>
    </div>
  );
};

export default SettingsUnitsTab;