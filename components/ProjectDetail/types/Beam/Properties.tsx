import React, { useState } from 'react';

interface BeamPropertiesProps {
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

const BeamProperties: React.FC<BeamPropertiesProps> = ({ onUpdate }) => {
  const [data, setData] = useState({
    length: 20,
    width: 12,
    depth: 24,
  });

  const handleChange = (key: string, val: any) => {
    const newData = { ...data, [key]: val };
    setData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-1">
      <InputRow label="Span Length:" value={data.length} onChange={(v) => handleChange('length', v)} unit="ft" />
      <InputRow label="Width:" value={data.width} onChange={(v) => handleChange('width', v)} unit="in" />
      <InputRow label="Depth:" value={data.depth} onChange={(v) => handleChange('depth', v)} unit="in" />
    </div>
  );
};

export default BeamProperties;