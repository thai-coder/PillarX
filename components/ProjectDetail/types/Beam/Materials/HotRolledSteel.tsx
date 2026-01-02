
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HotRolledSteelProps {
  onUpdate: (data: any) => void;
}

const HotRolledSteel: React.FC<HotRolledSteelProps> = ({ onUpdate }) => {
  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-gray-900">Shape:</label>
        <div className="relative w-2/3">
          <select 
            className="w-full border border-gray-300 px-3 py-1.5 text-sm rounded bg-white focus:outline-none appearance-none font-medium"
            defaultValue="W8x10"
          >
            <option value="W8x10">W8x10</option>
            <option value="W10x12">W10x12</option>
            <option value="W12x14">W12x14</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-gray-900">Steel Grade:</label>
        <div className="relative w-2/3">
          <select 
            className="w-full border border-gray-300 px-3 py-1.5 text-sm rounded bg-white focus:outline-none appearance-none font-medium"
            defaultValue="A992"
          >
            <option value="A992">A992 (Fy=50 ksi)</option>
            <option value="A36">A36 (Fy=36 ksi)</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotRolledSteel;
