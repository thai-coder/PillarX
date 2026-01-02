
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface WoodProps {
  onUpdate: (data: any) => void;
}

const Wood: React.FC<WoodProps> = ({ onUpdate }) => {
  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-gray-900">Species:</label>
        <div className="relative w-2/3">
          <select 
            className="w-full border border-gray-300 px-3 py-1.5 text-sm rounded bg-white focus:outline-none appearance-none font-medium"
            defaultValue="DF"
          >
            <option value="DF">Douglas Fir-Larch</option>
            <option value="SP">Southern Pine</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wood;
