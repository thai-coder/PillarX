import React, { useState } from 'react';

const SeismicLoadProperties: React.FC<{ onUpdate: (d: any) => void }> = ({ onUpdate }) => {
  const [data, setData] = useState({ SDS: 1.0, SD1: 0.6 });
  const h = (k: string, v: any) => { const n = { ...data, [k]: v }; setData(n); onUpdate(n); };
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm text-gray-600 font-medium w-1/3">SDS:</label>
        <div className="flex items-center w-2/3">
          <input type="number" step="0.01" value={data.SDS} onChange={(e) => h('SDS', Number(e.target.value))} className="w-full border border-gray-200 px-3 py-1.5 text-sm rounded bg-gray-50/50" />
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm text-gray-600 font-medium w-1/3">SD1:</label>
        <div className="flex items-center w-2/3">
          <input type="number" step="0.01" value={data.SD1} onChange={(e) => h('SD1', Number(e.target.value))} className="w-full border border-gray-200 px-3 py-1.5 text-sm rounded bg-gray-50/50" />
        </div>
      </div>
    </div>
  );
};

export default SeismicLoadProperties;