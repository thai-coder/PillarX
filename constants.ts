import { Project } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Project 1',
    componentsCount: 2,
    components: [
      { id: 'c1', type: 'Beam', name: 'Beam 1', quantity: 1 },
      { id: 'c2', type: 'Column', name: 'Column 1', quantity: 1 }
    ],
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
    dateModified: '10/01/2025',
    isRecent: true,
  },
];