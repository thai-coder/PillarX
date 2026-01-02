
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ProjectSettings } from '../../../types';

interface SettingsCodesTabProps {
  settings: ProjectSettings['codes'];
  onChange: (key: keyof ProjectSettings['codes'], value: string) => void;
}

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

const SettingsCodesTab: React.FC<SettingsCodesTabProps> = ({ settings, onChange }) => {
  return (
    <div className="space-y-1 md:space-y-2">
      <CodeSelectRow 
        label="Hot Rolled Steel" 
        value={settings.hotRolledSteel}
        onChange={(v) => onChange('hotRolledSteel', v)}
        options={['AISC 15th (360-16): LRFD', 'AISC 14th (360-10): LRFD', 'AISC 15th (360-16): ASD']}
      />
      <CodeSelectRow 
        label="Composite Steel Beam" 
        value={settings.compositeSteelBeam}
        onChange={(v) => onChange('compositeSteelBeam', v)}
        options={['AISC 15th (360-16): LRFD', 'AISC 14th (360-10): LRFD']}
      />
      <CodeSelectRow 
        label="Cold Formed Steel" 
        value={settings.coldFormedSteel}
        onChange={(v) => onChange('coldFormedSteel', v)}
        options={['AISI S100-20: LRFD', 'AISI S100-16: LRFD']}
      />
      <CodeSelectRow 
        label="Concrete Beam/Column" 
        value={settings.concreteBeamColumn}
        onChange={(v) => onChange('concreteBeamColumn', v)}
        options={['ACI 318-19', 'ACI 318-14']}
      />
      <CodeSelectRow 
        label="Concrete Foundations" 
        value={settings.concreteFoundations}
        onChange={(v) => onChange('concreteFoundations', v)}
        options={['ACI 318-19', 'ACI 318-14', 'ACI 318-11']}
      />
      <CodeSelectRow 
        label="Concrete Drilled Pier" 
        value={settings.concreteDrilledPier}
        onChange={(v) => onChange('concreteDrilledPier', v)}
        options={['ACI 318-19', 'ACI 318-14']}
      />
      <CodeSelectRow 
        label="Wood" 
        value={settings.wood}
        onChange={(v) => onChange('wood', v)}
        options={['AWC NDS-18: ASD', 'AWC NDS-15: ASD']}
      />
      <CodeSelectRow 
        label="Masonry" 
        value={settings.masonry}
        onChange={(v) => onChange('masonry', v)}
        options={['TMS 402-16: ASD', 'TMS 402-13: ASD']}
      />
      <CodeSelectRow 
        label="Aluminum" 
        value={settings.aluminum}
        onChange={(v) => onChange('aluminum', v)}
        options={['AA ADM1-20: LRFD - Building', 'AA ADM1-15: LRFD']}
      />
      <CodeSelectRow 
        label="Stainless Steel" 
        value={settings.stainlessSteel}
        onChange={(v) => onChange('stainlessSteel', v)}
        options={['AISC 14th (360-10): LRFD', 'AISC 15th (360-16): LRFD']}
      />
      <CodeSelectRow 
        label="Steel Joist" 
        value={settings.steelJoist}
        onChange={(v) => onChange('steelJoist', v)}
        options={['SJI 43rd/44th Edition: ASD', 'SJI 43rd/44th Edition: LRFD']}
      />
      <CodeSelectRow 
        label="Seismic" 
        value={settings.seismic}
        onChange={(v) => onChange('seismic', v)}
        options={['ASCE 7-16', 'ASCE 7-10', 'ASCE 7-22']}
      />
      <CodeSelectRow 
        label="Wind" 
        value={settings.wind}
        onChange={(v) => onChange('wind', v)}
        options={['ASCE 7-16', 'ASCE 7-10', 'ASCE 7-22']}
      />
    </div>
  );
};

export default SettingsCodesTab;
