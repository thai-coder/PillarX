import React, { useState } from 'react';

const InputRow = ({ label, value, onChange, unit }: { label: string, value: string | number, onChange: (val: any) => void, unit?: string }) => (
  <div className="flex items-center justify-between mb-4">
    <label className="text-sm text-gray-600 font-medium w-1/3">{label}</label>
    <div className="flex items-center w-2/3">
      <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full border border-gray-200 px-3 py-1.5 text-sm rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/50" />
      {unit && <span className="ml-2 text-xs text-gray-400 w-6 font-medium">{unit}</span>}
    </div>
  </div>
);

const SpreadFootingProperties: React.FC<{ onUpdate: (d: any) => void }> = ({ onUpdate }) => {
  const [data, setData] = useState({ size: 6, thickness: 12 });
  const h = (k: string, v: any) => { const n = { ...data, [k]: v }; setData(n); onUpdate(n); };
  return (
    <div className="space-y-1">
      <InputRow label="Footing Size:" value={data.size} onChange={(v) => h('size', v)} unit="ft" />
      <InputRow label="Thickness:" value={data.thickness} onChange={(v) => h('thickness', v)} unit="in" />
    </div>
  );
};

export default SpreadFootingProperties;