import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface RetainingWallPropertiesProps {
  onUpdate: (data: any) => void;
}

const InputRow = ({ label, value, onChange, unit }: { label: string, value: string | number, onChange: (val: any) => void, unit?: string }) => (
  <div className="flex items-center justify-between mb-4">
    <label className="text-sm text-gray-600 font-medium w-1/3">{label}</label>
    <div className="flex items-center w-2/3">
      <input 
        type="number" 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full border border-gray-200 px-3 py-1.5 text-sm rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/50"
      />
      {unit && <span className="ml-2 text-xs text-gray-400 w-6 font-medium">{unit}</span>}
    </div>
  </div>
);

const RetainingWallProperties: React.FC<RetainingWallPropertiesProps> = ({ onUpdate }) => {
  const [data, setData] = useState({
    length: 10,
    wallHeight: 5,
    wallThickness: 12,
    toeLength: 2,
    heelLength: 4,
    footingThickness: 12,
    hasKey: true
  });

  const handleChange = (key: string, val: any) => {
    const newData = { ...data, [key]: val };
    setData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-1">
      <InputRow label="Length:" value={data.length} onChange={(v) => handleChange('length', v)} unit="ft" />
      <InputRow label="Wall Height" value={data.wallHeight} onChange={(v) => handleChange('wallHeight', v)} unit="ft" />
      <InputRow label="Wall Thickness" value={data.wallThickness} onChange={(v) => handleChange('wallThickness', v)} unit="in" />
      <InputRow label="Toe Length:" value={data.toeLength} onChange={(v) => handleChange('toeLength', v)} unit="ft" />
      <InputRow label="Heel Length:" value={data.heelLength} onChange={(v) => handleChange('heelLength', v)} unit="ft" />
      <InputRow label="Footing Thickness:" value={data.footingThickness} onChange={(v) => handleChange('footingThickness', v)} unit="in" />
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm text-gray-600 font-medium w-1/3">Key:</label>
        <div className="w-2/3">
           <select 
             className="w-full border border-gray-200 px-3 py-1.5 text-sm rounded bg-gray-50/50 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium" 
             value={data.hasKey ? 'Yes' : 'No'} 
             onChange={(e) => handleChange('hasKey', e.target.value === 'Yes')}
           >
             <option value="Yes">Yes</option>
             <option value="No">No</option>
           </select>
        </div>
      </div>
    </div>
  );
};

export default RetainingWallProperties;