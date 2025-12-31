import React from 'react';

export interface Project {
  id: string;
  name: string;
  components: number;
  dateModified: string;
  isRecent?: boolean;
  lastComponentType?: string;
}

export type ViewType = 'recents' | 'all' | 'my_projects';

export interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  id: ViewType;
}