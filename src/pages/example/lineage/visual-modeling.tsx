import VisualModeling from 'react-visual-modeling';
import { columns, data } from '@/data/visual-modeling/data';
import { actionMenu, edgeMenu, nodeMenu } from '@/data/visual-modeling/menu';
// import '@/data/visual-modeling/index.css';
import 'react-visual-modeling/dist/index.css';
import { useState } from 'react';

interface VisualModelingCollapse {
  enable?: boolean;
  defaultMode?: string;
}

interface VisualModelingMinimapConfig {
  nodeColor?: any;
  activeNodeColor?: any;
}

interface VisualModelingMinimap {
  enable?: boolean;
  config?: VisualModelingMinimapConfig;
}

interface VisualModelingConfig {
  showActionIcon?: boolean;
  allowKeyboard?: boolean;
  collapse?: VisualModelingCollapse;
  titleRender?: (title: string) => void;
  titleExtIconRender?: (node) => void;
  labelRender?: (label) => void;
  minimap?: VisualModelingMinimap;
}

export default function VisualModel() {
  const [modelData, setModelData] = useState(data);
  const config: VisualModelingConfig = {
    butterfly: {
      theme: {
        edge: {
          shapeType: 'Manhattan',
        },
      },
    },
  };
  return (
    data && columns && nodeMenu && edgeMenu && actionMenu
    && (
      <VisualModeling
        width={500}
        height={500}
        data={modelData}
        column={columns}
        nodeMenu={nodeMenu}
        edgeMenu={edgeMenu}
        actionMenu={actionMenu}
        config={config}
      />
    )
  );
}
