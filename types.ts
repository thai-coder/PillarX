import React from 'react';

export interface User {
  id: string;
  email: string;
  full_name: string;
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

export interface Project {
  id: string;
  name: string;
  components: number;
  dateModified: string;
  isRecent?: boolean;
  lastComponentType?: string;
}

export type ViewType = 'recents' | 'all' | 'my_projects' | 'activity';

export interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  id: ViewType;
}