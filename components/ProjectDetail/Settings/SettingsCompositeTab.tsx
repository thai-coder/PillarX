
import React from 'react';
import { ProjectSettings } from '../../../types';

interface SettingsCompositeTabProps {
  settings: ProjectSettings['composite'];
  onChange: (key: keyof ProjectSettings['composite'], value: any) => void;
}

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

const SettingsCompositeTab: React.FC<SettingsCompositeTabProps> = ({ settings, onChange }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-end gap-10 mb-2 pr-4">
        <span className="text-sm font-bold text-gray-800 w-28 text-center">Min</span>
        <span className="text-sm font-bold text-gray-800 w-28 text-center">Max</span>
      </div>

      <div className="flex items-center justify-between py-6 border-b border-gray-100">
        <label className="text-sm font-bold text-gray-800">% Composite</label>
        <div className="flex gap-10">
          <CompositeUnitInput 
            value={settings.percentCompositeMin} 
            onChange={(v) => onChange('percentCompositeMin', v)} 
            unit="%" 
          />
          <CompositeUnitInput 
            value={settings.percentCompositeMax} 
            onChange={(v) => onChange('percentCompositeMax', v)} 
            unit="%" 
          />
        </div>
      </div>

      <div className="flex items-center justify-between py-6 border-b border-gray-100">
        <label className="text-sm font-bold text-gray-800">Stud Spacing</label>
        <div className="flex gap-10">
          <CompositeUnitInput 
            value={settings.studSpacingMin} 
            onChange={(v) => onChange('studSpacingMin', v)} 
            unit="in" 
          />
          <CompositeUnitInput 
            value={settings.studSpacingMax} 
            onChange={(v) => onChange('studSpacingMax', v)} 
            unit="in" 
          />
        </div>
      </div>

      <div className="flex items-center justify-between py-6 border-b border-gray-100">
        <label className="text-sm font-bold text-gray-800">Min Flange Width for 2 Rows</label>
        <div className="flex justify-end pr-[9.5rem]">
          <CompositeUnitInput 
            value={settings.minFlangeWidth2Rows} 
            onChange={(v) => onChange('minFlangeWidth2Rows', v)} 
            unit="in" 
          />
        </div>
      </div>

      <div className="flex items-center justify-between py-6 border-b border-gray-100">
        <label className="text-sm font-bold text-gray-800">Min Flange Width for 3 Rows</label>
        <div className="flex justify-end pr-[9.5rem]">
          <CompositeUnitInput 
            value={settings.minFlangeWidth3Rows} 
            onChange={(v) => onChange('minFlangeWidth3Rows', v)} 
            unit="in" 
          />
        </div>
      </div>

      <div className="flex items-center justify-between py-6">
        <label className="text-sm font-bold text-gray-800">I-effective (% of I-equivalent)</label>
        <div className="flex justify-end pr-[9.5rem]">
          <CompositeUnitInput 
            value={settings.iEffective} 
            onChange={(v) => onChange('iEffective', v)} 
            unit="%" 
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsCompositeTab;
