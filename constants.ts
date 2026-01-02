
import { Project, ProjectSettings } from './types';

export const DEFAULT_SETTINGS: ProjectSettings = {
  codes: {
    hotRolledSteel: 'AISC 15th (360-16): LRFD',
    compositeSteelBeam: 'AISC 15th (360-16): LRFD',
    coldFormedSteel: 'AISI S100-20: LRFD',
    concreteBeamColumn: 'ACI 318-19',
    concreteFoundations: 'ACI 318-19',
    concreteDrilledPier: 'ACI 318-19',
    wood: 'AWC NDS-18: ASD',
    masonry: 'TMS 402-16: ASD',
    aluminum: 'AA ADM1-20: LRFD - Building',
    stainlessSteel: 'AISC 14th (360-10): LRFD',
    steelJoist: 'SJI 43rd/44th Edition: ASD',
    seismic: 'ASCE 7-16',
    wind: 'ASCE 7-16',
  },
  concrete: {
    strength: '4000 psi',
    density: '150 pcf',
    rebarGrade: 'ASTM A615',
    foundationRebarGrade: 'ASTM A615',
    stressOptions: 'Rectangular Stress Block',
    columnSteelMin: 1,
    columnSteelMax: 8,
    drilledPierSteelMin: 1,
    drilledPierSteelMax: 8,
    pedestalSteel: 'Auto',
    useCrackedSections: true,
    minBarSpacing: true,
    optimizeOTMSliding: true,
    frictionCoefficient: 0.3,
  },
  composite: {
    percentCompositeMin: 25,
    percentCompositeMax: 100,
    studSpacingMin: 4.5,
    studSpacingMax: 36,
    minFlangeWidth2Rows: 5.5,
    minFlangeWidth3Rows: 8.5,
    iEffective: 75,
  },
  unitSystem: 'Imperial',
  units: {
    length: 'ft',
    dimensions: 'in',
    materialStiffness: 'ksi',
    weightDensities: 'k/ft³',
    forces: 'k',
    linearForces: 'klf',
    moments: 'k-ft',
    linearMoments: 'k-ft/ft',
    surfaceAreaLoads: 'ksf',
    deflections: 'in',
    stresses: 'ksi',
    areaLength: '',
    area: 'ft²',
  },
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
    settings: { ...DEFAULT_SETTINGS, unitSystem: 'Metric' },
    dateModified: '10/01/2025',
    isRecent: true,
  },
];
