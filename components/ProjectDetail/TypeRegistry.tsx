import React from 'react';
import RetainingWallProperties from './types/RetainingWall/Properties';
import RetainingWallVisualizer from './types/RetainingWall/Visualizer';
import BeamProperties from './types/Beam/Properties';
import BeamVisualizer from './types/Beam/Visualizer';
import ColumnProperties from './types/Column/Properties';
import ColumnVisualizer from './types/Column/Visualizer';
import SteelJoistProperties from './types/SteelJoist/Properties';
import SteelJoistVisualizer from './types/SteelJoist/Visualizer';
import CompositeBeamProperties from './types/CompositeBeam/Properties';
import CompositeBeamVisualizer from './types/CompositeBeam/Visualizer';
import SpreadFootingProperties from './types/SpreadFooting/Properties';
import SpreadFootingVisualizer from './types/SpreadFooting/Visualizer';
import WallFootingProperties from './types/WallFooting/Properties';
import WallFootingVisualizer from './types/WallFooting/Visualizer';
import DrilledPierProperties from './types/DrilledPier/Properties';
import DrilledPierVisualizer from './types/DrilledPier/Visualizer';
import SeismicLoadProperties from './types/SeismicLoad/Properties';
import SeismicLoadVisualizer from './types/SeismicLoad/Visualizer';
import WindLoadProperties from './types/WindLoad/Properties';
import WindLoadVisualizer from './types/WindLoad/Visualizer';

export interface ComponentDefinition {
  Properties: React.FC<{ onUpdate: (data: any) => void }>;
  Visualizer: React.FC<{ data: any }>;
}

const registry: Record<string, ComponentDefinition> = {
  'Retaining Wall': {
    Properties: RetainingWallProperties,
    Visualizer: RetainingWallVisualizer,
  },
  'Beam': {
    Properties: BeamProperties,
    Visualizer: BeamVisualizer,
  },
  'Column': {
    Properties: ColumnProperties,
    Visualizer: ColumnVisualizer,
  },
  'Steel Joist': {
    Properties: SteelJoistProperties,
    Visualizer: SteelJoistVisualizer,
  },
  'Composite Beam': {
    Properties: CompositeBeamProperties,
    Visualizer: CompositeBeamVisualizer,
  },
  'Spread Footing': {
    Properties: SpreadFootingProperties,
    Visualizer: SpreadFootingVisualizer,
  },
  'Wall Footing': {
    Properties: WallFootingProperties,
    Visualizer: WallFootingVisualizer,
  },
  'Drilled Pier': {
    Properties: DrilledPierProperties,
    Visualizer: DrilledPierVisualizer,
  },
  'Seismic Load': {
    Properties: SeismicLoadProperties,
    Visualizer: SeismicLoadVisualizer,
  },
  'Wind Load': {
    Properties: WindLoadProperties,
    Visualizer: WindLoadVisualizer,
  },
  // Default fallback for types not yet fully implemented
  'Default': {
    Properties: () => <div className="p-4 text-gray-400 italic">No properties available for this type.</div>,
    Visualizer: () => (
      <div className="flex flex-col items-center justify-center h-full text-gray-300">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M4 20h16M12 4v16" />
        </svg>
        <span className="mt-4 font-bold text-sm uppercase tracking-widest">Type Visualization Pending</span>
      </div>
    )
  }
};

export const getComponentDefinition = (type: string): ComponentDefinition => {
  return registry[type] || registry['Default'];
};