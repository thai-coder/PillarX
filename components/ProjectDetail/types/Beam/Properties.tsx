
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import HotRolledSteel from './Materials/HotRolledSteel';
import Wood from './Materials/Wood';
import Concrete from './Materials/Concrete';

interface BeamPropertiesProps {
  onUpdate: (data: any) => void;
}

const BeamProperties: React.FC<BeamPropertiesProps> = ({ onUpdate }) => {
  const [materialType, setMaterialType] = useState('Hot Rolled Steel');

  const handleMaterialChange = (type: string) => {
    setMaterialType(type);
    onUpdate({ materialType: type });
  };

  const renderMaterialControls = () => {
    switch (materialType) {
      case 'Hot Rolled Steel':
        return <HotRolledSteel onUpdate={onUpdate} />;
      case 'Wood':
        return <Wood onUpdate={onUpdate} />;
      case 'Concrete':
        return <Concrete onUpdate={onUpdate} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Summary Section */}
      <div className="flex items-center gap-6 py-2 border-b border-gray-100 mb-6">
        <span className="text-sm font-medium text-gray-400">Summary:</span>
        <span className="text-sm font-bold text-gray-900 tracking-tight">W8x10 (A992)</span>
      </div>

      {/* Material Type Selector */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-gray-900">Material Type:</label>
        <div className="relative w-2/3">
          <select 
            value={materialType}
            onChange={(e) => handleMaterialChange(e.target.value)}
            className="w-full border border-gray-400 px-3 py-1.5 text-sm rounded bg-white focus:outline-none appearance-none font-medium shadow-sm transition-all"
          >
            <option value="Hot Rolled Steel">Hot Rolled Steel</option>
            <option value="Wood">Wood</option>
            <option value="Concrete">Concrete</option>
            <option value="Cold Formed Steel">Cold Formed Steel</option>
            <option value="Aluminum">Aluminum</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-900">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Dynamic Material Specific Controls */}
      {renderMaterialControls()}
    </div>
  );
};

export default BeamProperties;
