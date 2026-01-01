import { Project, ProjectSettings } from './types';

export const DEFAULT_SETTINGS: ProjectSettings = {
  codes: {
    hotRolledSteel: 'AISC 15th (360-16): LRFD',
    concreteFoundations: 'ACI 318-19',
    seismic: 'ASCE 7-16',
    wind: 'ASCE 7-16',
  },
  concrete: {
    strength: '4000 psi',
    density: '150 pcf',
  },
  units: 'Imperial',
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Project 1',
    componentsCount: 2,
    components: [
      { id: 'c1', type: 'Beam', name: 'Beam 1', quantity: 1 },
      { id: 'c2', type: 'Column', name: 'Column 1', quantity: 1 }
    ],
    settings: { ...DEFAULT_SETTINGS },
    dateModified: '12/31/2025',
    isRecent: true,
  },
  {
    id: '2',
    name: 'Structural Analysis Tower A',
    componentsCount: 45,
    components: [
      { id: 'c3', type: 'Retaining Wall', name: 'Tower Base', quantity: 45 }
    ],
    settings: { ...DEFAULT_SETTINGS },
    dateModified: '11/15/2025',
    isRecent: false,
  },
  {
    id: '3',
    name: 'Bridge Section B',
    componentsCount: 12,
    components: [
      { id: 'c4', type: 'Beam', name: 'Section B Beam', quantity: 12 }
    ],
    settings: { ...DEFAULT_SETTINGS, units: 'Metric' },
    dateModified: '10/01/2025',
    isRecent: true,
  },
];