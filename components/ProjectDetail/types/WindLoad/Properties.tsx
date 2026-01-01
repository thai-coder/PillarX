import React, { useState } from 'react';

const WindLoadProperties: React.FC<{ onUpdate: (d: any) => void }> = ({ onUpdate }) => {
  const [data, setData] = useState({ windSpeed: 115 });
  const h = (k: string, v: any) => { const n = { ...data, [k]: v }; setData(n); onUpdate(n); };
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm text-gray-600 font-medium w-1/3">Basic Wind Speed:</label>
        <div className="flex items-center w-2/3">
          <input type="number" value={data.windSpeed} onChange={(e) => h('windSpeed', Number(e.target.value))} className="w-full border border-gray-200 px-3 py-1.5 text-sm rounded bg-gray-50/50" />
          <span className="ml-2 text-xs text-gray-400 w-8 font-medium">mph</span>
        </div>
      </div>
    </div>
  );
};

export default WindLoadProperties;