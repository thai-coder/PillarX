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

export interface Project {
  id: string;
  name: string;
  componentsCount: number;
  components: ProjectComponent[];
  dateModified: string;
  isRecent?: boolean;
}

export type ViewType = 'recents' | 'all' | 'my_projects' | 'activity';

export interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  id: ViewType;
}