import React from 'react';
import { ProjectComponent } from '../../types';
import Sidebar from './Sidebar';

interface LeftPanelProps {
  components: ProjectComponent[];
  activeComponentId: string;
  collapsed: boolean;
  filterType: string;
  componentTypes: string[];
  onAddComponent: () => void;
  onSelectComponent: (id: string) => void;
  onFilterChange: (type: string) => void;
  onDuplicate: (e: React.MouseEvent, comp: ProjectComponent) => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
  onRename: (id: string, name: string) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = (props) => {
  return <Sidebar {...props} />;
};

export default LeftPanel;