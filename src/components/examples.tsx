import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScrollArea } from '@components/ui/scroll-area.tsx';
import { Separator } from '@components/ui/separator.tsx';

const itemList = [
  { name: '/example/command/combobox', path: '/example/command/combobox' },
  { name: '/example/command/demo', path: '/example/command/demo' },
  { name: '/example/command/dialog', path: '/example/command/dialog' },
  {
    name: '/example/command/dropdown-menu',
    path: '/example/command/dropdown-menu',
  },
  { name: '/example/command/popover', path: '/example/command/popover' },
  { name: '/example/context-menu/demo', path: '/example/context-menu/demo' },
  { name: '/example/dialog/demo', path: '/example/dialog/demo' },
  {
    name: '/example/dropdown-menu/checkboxes',
    path: '/example/dropdown-menu/checkboxes',
  },
  {
    name: '/example/dropdown-menu/demo',
    path: '/example/dropdown-menu/demo',
  },
  {
    name: '/example/dropdown-menu/radio-group',
    path: '/example/dropdown-menu/radio-group',
  },
  { name: '/example/hover-card/demo', path: '/example/hover-card/demo' },
  { name: '/example/input/demo', path: '/example/input/demo' },
  { name: '/example/input/disabled', path: '/example/input/disabled' },
  { name: '/example/input/file', path: '/example/input/file' },
  { name: '/example/input/with-button', path: '/example/input/with-button' },
  { name: '/example/input/with-label', path: '/example/input/with-label' },
  { name: '/example/input/with-text', path: '/example/input/with-text' },
  { name: '/example/label/demo', path: '/example/label/demo' },
  { name: '/example/menubar/demo', path: '/example/menubar/demo' },
  {
    name: '/example/navigation-menu/demo',
    path: '/example/navigation-menu/demo',
  },
  { name: '/example/popover/demo', path: '/example/popover/demo' },
  { name: '/example/progress/demo', path: '/example/progress/demo' },
  { name: '/example/radio-group/demo', path: '/example/radio-group/demo' },
  { name: '/example/scroll-area/demo', path: '/example/scroll-area/demo' },
  { name: '/example/select/demo', path: '/example/select/demo' },
  { name: '/example/separator/demo', path: '/example/separator/demo' },
  { name: '/example/sheet/demo', path: '/example/sheet/demo' },
  { name: '/example/sheet/position', path: '/example/sheet/position' },
  { name: '/example/sheet/size', path: '/example/sheet/size' },
  { name: '/example/skeleton/demo', path: '/example/skeleton/demo' },
  { name: '/example/slider/demo', path: '/example/slider/demo' },
  { name: '/example/switch/demo', path: '/example/switch/demo' },
  { name: '/example/tabs/demo', path: '/example/tabs/demo' },
  { name: '/example/textarea/demo', path: '/example/textarea/demo' },
  { name: '/example/textarea/disabled', path: '/example/textarea/disabled' },
  {
    name: '/example/textarea/with-button',
    path: '/example/textarea/with-button',
  },
  {
    name: '/example/textarea/with-label',
    path: '/example/textarea/with-label',
  },
  {
    name: '/example/textarea/with-text',
    path: '/example/textarea/with-text',
  },
  { name: '/example/toast/demo', path: '/example/toast/demo' },
  { name: '/example/toast/destructive', path: '/example/toast/destructive' },
  { name: '/example/toast/simple', path: '/example/toast/simple' },
  { name: '/example/toast/with-action', path: '/example/toast/with-action' },
  { name: '/example/toast/with-title', path: '/example/toast/with-title' },
  { name: '/example/toggle/demo', path: '/example/toggle/demo' },
  { name: '/example/toggle/disabled', path: '/example/toggle/disabled' },
  { name: '/example/toggle/lg', path: '/example/toggle/lg' },
  { name: '/example/toggle/outline', path: '/example/toggle/outline' },
  { name: '/example/toggle/sm', path: '/example/toggle/sm' },
  { name: '/example/toggle/with-text', path: '/example/toggle/with-text' },
  { name: '/example/tooltip/demo', path: '/example/tooltip/demo' },
  {
    name: '/example/typography/blockquote',
    path: '/example/typography/blockquote',
  },
  { name: '/example/typography/demo', path: '/example/typography/demo' },
  { name: '/example/typography/h1', path: '/example/typography/h1' },
  { name: '/example/typography/h2', path: '/example/typography/h2' },
  { name: '/example/typography/h3', path: '/example/typography/h3' },
  { name: '/example/typography/h4', path: '/example/typography/h4' },
  {
    name: '/example/typography/inline-code',
    path: '/example/typography/inline-code',
  },
  { name: '/example/typography/large', path: '/example/typography/large' },
  { name: '/example/typography/lead', path: '/example/typography/lead' },
  { name: '/example/typography/list', path: '/example/typography/list' },
  { name: '/example/typography/muted', path: '/example/typography/muted' },
  { name: '/example/typography/p', path: '/example/typography/p' },
  { name: '/example/typography/small', path: '/example/typography/small' },
  { name: '/example/typography/table', path: '/example/typography/table' },
];

export default function Examples() {
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  const handleListItemClick = (item: { name: string; path: string }) => {
    navigate(item.path);
    setPath(item.path);
  };

  return (
    <ScrollArea className="h-96 w-80 rounded-md border">
      <div className="p-4">
        {itemList.map((item) => (
          <div
            key={`example-path-key-${item.path}}`}
          >
            <div
              className="cursor-pointer text-sm"
              onClick={() => handleListItemClick(item)}
            >
              {item.name}
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
