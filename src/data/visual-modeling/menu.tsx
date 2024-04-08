// 节点菜单
import {
  DoorOpen, Minus, Plus, Star,
} from 'lucide-react';

export const nodeMenu = [
  {
    key: 'setting',
    title: '节点设置',
    onClick: (key, data) => {
      console.log('click setting');
    },
  },
  {
    key: 'delete',
    render: (key, data) => <span>节点删除</span>,
    onClick: (key, data) => {
      console.log('delete node');
    },
  },
];

// 边菜单
export const edgeMenu = [
  {
    key: 'setting',
    title: '线段设置',
    onClick: (key, data) => {
      console.log('click setting');
    },
  },
  {
    key: 'delete',
    render: (key, data) => <span>线段删除</span>,
    onClick: (key, data) => {
      console.log('delete node');
    },
  },
];

export const actionMenu = ({
  onAddEdge,
  onDelEdge,
  onSetGridMode,
}) => [
  {
    key: 'zoom-in',
    disable: true,
  },
  {
    icon: <Star />,
    key: 'star',
    onClick: () => {
      alert('点击收藏！');
    },
  },
  {
    icon: <Plus />,
    key: 'plus',
    title: '添加一条连线',
    onClick: () => {
      onAddEdge();
    },
  },
  {
    icon: <Minus />,
    key: 'minus',
    title: '删除一条连线',
    onClick: () => {
      onDelEdge();
    },
  },
  {
    icon: <DoorOpen />,
    title: '框选',
    key: 'select',
    onClick: () => {
      onSetGridMode();
    },
  },
];
