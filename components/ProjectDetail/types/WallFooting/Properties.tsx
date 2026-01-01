import React, { useState } from 'react';

const WallFootingProperties: React.FC<{ onUpdate: (d: any) => void }> = ({ onUpdate }) => {
  const [data, setData] = useState({ width: 2, thickness: 12 });
  const h = (k: string, v: any) => { const n = { ...data, [k]: v }; setData(n); onUpdate(n); };
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm text-gray-600 font-medium w-1/3">Footing Width:</label>
        <div className="flex items-center w-2/3">
          <input type="number" value={data.width} onChange={(e) => h('width', Number(e.target.value))} className="w-full border border-gray-200 px-3 py-1.5 text-sm rounded bg-gray-50/50" />
          <span className="ml-2 text-xs text-gray-400 w-6 font-medium">ft</span>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm text-gray-600 font-medium w-1/3">Thickness:</label>
        <div className="flex items-center w-2/3">
          <input type="number" value={data.thickness} onChange={(e) => h('thickness', Number(e.target.value))} className="w-full border border-gray-200 px-3 py-1.5 text-sm rounded bg-gray-50/50" />
          <span className="ml-2 text-xs text-gray-400 w-6 font-medium">in</span>
        </div>
      </div>
    </div>
  );
};

export default WallFootingProperties;