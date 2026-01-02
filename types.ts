
import React from 'react';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'ADMIN' | 'USER';
  is_bot: boolean;
}

export interface UserActivity {
  id: string;
  user_id?: string;
  action_type: string;
  action_detail?: string;
  ip_address: string;
  user_agent: string;
  actor_type: 'HUMAN' | 'BOT';
  created_at: string;
}

export interface ProjectComponent {
  id: string;
  type: string;
  name: string;
  quantity: number;
}

export interface ProjectSettings {
  codes: {
    hotRolledSteel: string;
    compositeSteelBeam: string;
    coldFormedSteel: string;
    concreteBeamColumn: string;
    concreteFoundations: string;
    concreteDrilledPier: string;
    wood: string;
    masonry: string;
    aluminum: string;
    stainlessSteel: string;
    steelJoist: string;
    seismic: string;
    wind: string;
  };
  concrete: {
    strength: string;
    density: string;
    rebarGrade: string;
    foundationRebarGrade: string;
    stressOptions: string;
    columnSteelMin: number;
    columnSteelMax: number;
    drilledPierSteelMin: number;
    drilledPierSteelMax: number;
    pedestalSteel: string;
    useCrackedSections: boolean;
    minBarSpacing: boolean;
    optimizeOTMSliding: boolean;
    frictionCoefficient: number;
  };
  composite: {
    percentCompositeMin: number;
    percentCompositeMax: number;
    studSpacingMin: number;
    studSpacingMax: number;
    minFlangeWidth2Rows: number;
    minFlangeWidth3Rows: number;
    iEffective: number;
  };
  unitSystem: 'Imperial' | 'Metric';
  units: {
    length: string;
    dimensions: string;
    materialStiffness: string;
    weightDensities: string;
    forces: string;
    linearForces: string;
    moments: string;
    linearMoments: string;
    surfaceAreaLoads: string;
    deflections: string;
    stresses: string;
    areaLength: string;
    area: string;
  };
}

export interface Project {
  id: string;
  name: string;
  componentsCount: number;
  components: ProjectComponent[];
  settings: ProjectSettings;
  dateModified: string;
  isRecent?: boolean;
}

export type ViewType = 'recents' | 'all' | 'my_projects' | 'activity';

export interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  id: ViewType;
}
