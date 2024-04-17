import { LucideIcon } from 'lucide-react';

// eslint-disable-next-line no-use-before-define
interface IChildren extends IExample {
    path: string
    icon?: LucideIcon
}
export interface IExample {
    title: string,
    children?: IChildren[]
}

export const examples : IExample[] = [
  {
    title: 'Accordion',
    children: [
      { title: 'demo', path: '/example/accordion' },
    ],
  },
  {
    title: 'Alert',
    children: [
      { title: 'demo', path: '/example/alert' },
    ],
  },
  {
    title: 'Alert Dialog',
    children: [
      { title: 'demo', path: '/example/alert-dialog' },
    ],
  },
  {
    title: 'Aspect Ratio',
    children: [
      { title: 'demo', path: '/example/aspect-ratio' },
    ],
  },
  {
    title: 'Avatar',
    children: [
      { title: 'demo', path: '/example/avatar' },
    ],
  },
  {
    title: 'Command',
    children: [
      { title: 'combobox', path: '/example/command/combobox' },
      { title: 'demo', path: '/example/command/demo' },
      { title: 'dialog', path: '/example/command/dialog' },
      { title: 'dropdown-menu', path: '/example/command/dropdown-menu' },
      { title: 'popover', path: '/example/command/popover' },
    ],
  },
  {
    title: 'Context Menu',
    children: [
      { title: 'demo', path: '/example/context-menu/demo' },
    ],
  },
  {
    title: 'Dialog',
    children: [
      { title: 'demo', path: '/example/dialog/demo' },
    ],
  },
  {
    title: 'Dropdown Menu',
    children: [
      { title: 'checkboxes', path: '/example/dropdown-menu/checkboxes' },
      { title: 'demo', path: '/example/dropdown-menu' },
      { title: 'radio-group', path: '/example/dropdown-menu/radio-group' },
    ],
  },
  {
    title: 'Hover Card',
    children: [
      { title: 'demo', path: '/example/hover-card/demo' },
    ],
  },
  {
    title: 'Input',
    children: [
      { title: 'demo', path: '/example/input/demo' },
      { title: 'disabled', path: '/example/input/disabled' },
      { title: 'file', path: '/example/input/file' },
      { title: 'with-button', path: '/example/input/with-button' },
      { title: 'with-label', path: '/example/input/with-label' },
      { title: 'with-text', path: '/example/input/with-text' },
    ],
  },
  {
    title: 'Label',
    children: [
      { title: 'demo', path: '/example/label/demo' },
    ],
  },
  {
    title: 'Menu Bar',
    children: [
      { title: 'demo', path: '/example/menubar/demo' },
    ],
  },
  {
    title: 'Navigation Menu',
    children: [
      { title: 'demo', path: '/example/navigation-menu/demo' },
    ],
  },
  {
    title: 'Popover',
    children: [
      { title: 'demo', path: '/example/popover/demo' },
    ],
  },
  {
    title: 'Progress',
    children: [
      { title: 'demo', path: '/example/progress/demo' },
    ],
  },
  {
    title: 'Radio Group',
    children: [
      { title: 'demo', path: '/example/radio-group/demo' },
    ],
  },
  {
    title: 'Scroll Area',
    children: [
      { title: 'demo', path: '/example/scroll-area/demo' },
    ],
  },
  {
    title: 'Select',
    children: [
      { title: 'demo', path: '/example/select/demo' },
    ],
  },
  {
    title: 'Separator',
    children: [
      { title: 'demo', path: '/example/separator/demo' },
    ],
  },
  {
    title: 'Sheet',
    children: [
      { title: 'demo', path: '/example/sheet/demo' },
      { title: 'position', path: '/example/sheet/position' },
      { title: 'size', path: '/example/sheet/size' },
    ],
  },
  {
    title: 'Skeleton',
    children: [
      { title: 'demo', path: '/example/skeleton/demo' },
    ],
  },
  {
    title: 'Slider',
    children: [
      { title: 'demo', path: '/example/slider/demo' },
    ],
  },
  {
    title: 'Switch',
    children: [
      { title: 'demo', path: '/example/switch/demo' },
    ],
  },
  {
    title: 'Tabs',
    children: [
      { title: 'demo', path: '/example/tabs/demo' },
    ],
  },
  {
    title: 'Textarea',
    children: [
      { title: 'demo', path: '/example/textarea/demo' },
      { title: 'disabled', path: '/example/textarea/disabled' },
      { title: 'with-button', path: '/example/textarea/with-button' },
      { title: 'with-label', path: '/example/textarea/with-label' },
      { title: 'with-text', path: '/example/textarea/with-text' },
    ],
  },
  {
    title: 'Toast',
    children: [
      { title: 'demo', path: '/example/toast/demo' },
      { title: 'destructive', path: '/example/toast/destructive' },
      { title: 'simple', path: '/example/toast/simple' },
      { title: 'with-action', path: '/example/toast/with-action' },
      { title: 'with-title', path: '/example/toast/with-title' },
    ],
  },
  {
    title: 'Toggle',
    children: [
      { title: 'demo', path: '/example/toggle/demo' },
      { title: 'disabled', path: '/example/toggle/disabled' },
      { title: 'lg', path: '/example/toggle/lg' },
      { title: 'outline', path: '/example/toggle/outline' },
      { title: 'sm', path: '/example/toggle/sm' },
      { title: 'with-text', path: '/example/toggle/with-text' },
    ],
  },
  {
    title: 'Tooltip',
    children: [
      { title: 'demo', path: '/example/tooltip/demo' },
    ],
  },
  {
    title: 'Typography',
    children: [
      { title: 'blockquote', path: '/example/typography/blockquote' },
      { title: 'demo', path: '/example/typography/demo' },
      { title: 'h1', path: '/example/typography/h1' },
      { title: 'h2', path: '/example/typography/h2' },
      { title: 'h3', path: '/example/typography/h3' },
      { title: 'h4', path: '/example/typography/h4' },
      { title: 'inline-code', path: '/example/typography/inline-code' },
      { title: 'large', path: '/example/typography/large' },
      { title: 'lead', path: '/example/typography/lead' },
      { title: 'list', path: '/example/typography/list' },
      { title: 'muted', path: '/example/typography/muted' },
      { title: 'p', path: '/example/typography/p' },
      { title: 'small', path: '/example/typography/small' },
      { title: 'table', path: '/example/typography/table' },
      { title: 'mark down exmaple', path: '/example/typography/readme' },

    ],
  },
  {
    title: 'Markdown Editor',
    children: [
      { title: 'Viewer', path: '/example/markdown' },
      { title: 'Editor', path: '/example/markdown/editor' },
    ],
  },
  {
    title: 'Lineage',
    children: [
      { title: 'React Diagrams', path: '/example/lineage/react-diagram' },
    ],
  },
];
