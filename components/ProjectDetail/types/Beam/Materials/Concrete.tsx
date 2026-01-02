
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ConcreteProps {
  onUpdate: (data: any) => void;
}

const Concrete: React.FC<ConcreteProps> = ({ onUpdate }) => {
  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-gray-900">f'c:</label>
        <div className="relative w-2/3">
          <select 
            className="w-full border border-gray-300 px-3 py-1.5 text-sm rounded bg-white focus:outline-none appearance-none font-medium"
            defaultValue="4000"
          >
            <option value="3000">3000 psi</option>
            <option value="4000">4000 psi</option>
            <option value="5000">5000 psi</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concrete;
