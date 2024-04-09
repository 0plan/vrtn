// 节点菜单
import {
  DoorOpen, Frame, Minus, Plus, Star,
} from 'lucide-react';

export const nodeMenu = [
  {
    key: 'setting',
    title: 'Node 설정',
    onClick: (key, data) => {
      console.log('click setting: ', key, data);
    },
  },
  {
    key: 'delete',
    title: 'Node 삭제',
    onClick: (key, data) => {
      console.log('delete node: ', key, data);
    },
  },
];

// 边菜单
export const edgeMenu = [
  {
    key: 'setting',
    title: 'Edge 설정',
    onClick: (key, data) => {
      console.log('click setting');
    },
  },
  {
    key: 'delete',
    title: 'Edge 삭제',
    onClick: (key, data) => {
      console.log('delete node');
    },
  },
];

export const actionMenu = [
  {
    icon: <Frame />,
    key: 'fit',
    title: '맞춤',
  },
  {
    icon: <Plus />,
    key: 'zoom-in',
    title: '확대',
  },
  {
    icon: <Minus />,
    key: 'zoom-out',
    title: '축소',
  },
];
