import { Project } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Project 1',
    components: 2,
    dateModified: '12/31/2025',
    isRecent: true,
  },
  {
    id: '2',
    name: 'Structural Analysis Tower A',
    components: 45,
    dateModified: '11/15/2025',
    isRecent: false,
  },
  {
    id: '3',
    name: 'Bridge Section B',
    components: 12,
    dateModified: '10/01/2025',
    isRecent: true,
  },
];
