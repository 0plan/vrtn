import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

export default function Aside() {
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  const handleListItemClick = (path: string) => {
    navigate(path);
    setPath(path);
  };
  const examples = [
    { title: 'Accordion', children: [{ title: 'demo', path: '/example/accordion' }] },
    { title: 'Alert', children: [{ title: 'demo', path: '/example/alert' }] },
    { title: 'Alert Dialog', children: [{ title: 'demo', path: '/example/alert-dialog' }] },
    { title: 'Aspect Ratio', children: [{ title: 'demo', path: '/example/aspect-ratio' }] },
    { title: 'Avatar', children: [{ title: 'demo', path: '/example/avatar' }] },
    {
      title: 'Command',
      children: [{ title: 'combobox', path: '/example/command/combobox' },
        { title: 'demo', path: '/example/command/demo' },
        { title: 'dialog', path: '/example/command/dialog' },
        {
          title: 'dropdown-menu',
          path: '/example/command/dropdown-menu',
        },
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
      title: 'dialog',
      children: [
        { title: 'demo', path: '/example/dialog/demo' },
      ],
    },
    {
      title: 'dropdown-menu',
      children: [
        {
          title: '/example/dropdown-menu/checkboxes',
          path: '/example/dropdown-menu/checkboxes',
        },
        {
          title: '/example/dropdown-menu/demo',
          path: '/example/dropdown-menu/demo',
        },
        {
          title: '/example/dropdown-menu/radio-group',
          path: '/example/dropdown-menu/radio-group',
        },
        { title: '/example/hover-card/demo', path: '/example/hover-card/demo' },
        { title: '/example/input/demo', path: '/example/input/demo' },
        { title: '/example/input/disabled', path: '/example/input/disabled' },
        { title: '/example/input/file', path: '/example/input/file' },
        { title: '/example/input/with-button', path: '/example/input/with-button' },
        { title: '/example/input/with-label', path: '/example/input/with-label' },
        { title: '/example/input/with-text', path: '/example/input/with-text' },
        { title: '/example/label/demo', path: '/example/label/demo' },
        { title: '/example/menubar/demo', path: '/example/menubar/demo' },
        {
          title: '/example/navigation-menu/demo',
          path: '/example/navigation-menu/demo',
        },
        { title: '/example/popover/demo', path: '/example/popover/demo' },
        { title: '/example/progress/demo', path: '/example/progress/demo' },
        { title: '/example/radio-group/demo', path: '/example/radio-group/demo' },
        { title: '/example/scroll-area/demo', path: '/example/scroll-area/demo' },
        { title: '/example/select/demo', path: '/example/select/demo' },
        { title: '/example/separator/demo', path: '/example/separator/demo' },
        { title: '/example/sheet/demo', path: '/example/sheet/demo' },
        { title: '/example/sheet/position', path: '/example/sheet/position' },
        { title: '/example/sheet/size', path: '/example/sheet/size' },
        { title: '/example/skeleton/demo', path: '/example/skeleton/demo' },
        { title: '/example/slider/demo', path: '/example/slider/demo' },
        { title: '/example/switch/demo', path: '/example/switch/demo' },
        { title: '/example/tabs/demo', path: '/example/tabs/demo' },
        { title: '/example/textarea/demo', path: '/example/textarea/demo' },
        { title: '/example/textarea/disabled', path: '/example/textarea/disabled' },
        {
          title: '/example/textarea/with-button',
          path: '/example/textarea/with-button',
        },
        {
          title: '/example/textarea/with-label',
          path: '/example/textarea/with-label',
        },
        {
          title: '/example/textarea/with-text',
          path: '/example/textarea/with-text',
        },
        { title: '/example/toast/demo', path: '/example/toast/demo' },
        { title: '/example/toast/destructive', path: '/example/toast/destructive' },
        { title: '/example/toast/simple', path: '/example/toast/simple' },
        { title: '/example/toast/with-action', path: '/example/toast/with-action' },
        { title: '/example/toast/with-title', path: '/example/toast/with-title' },
        { title: '/example/toggle/demo', path: '/example/toggle/demo' },
        { title: '/example/toggle/disabled', path: '/example/toggle/disabled' },
        { title: '/example/toggle/lg', path: '/example/toggle/lg' },
        { title: '/example/toggle/outline', path: '/example/toggle/outline' },
        { title: '/example/toggle/sm', path: '/example/toggle/sm' },
        { title: '/example/toggle/with-text', path: '/example/toggle/with-text' },
        { title: '/example/tooltip/demo', path: '/example/tooltip/demo' },
        {
          title: '/example/typography/blockquote',
          path: '/example/typography/blockquote',
        },
        { title: '/example/typography/demo', path: '/example/typography/demo' },
        { title: '/example/typography/h1', path: '/example/typography/h1' },
        { title: '/example/typography/h2', path: '/example/typography/h2' },
        { title: '/example/typography/h3', path: '/example/typography/h3' },
        { title: '/example/typography/h4', path: '/example/typography/h4' },
        {
          title: '/example/typography/inline-code',
          path: '/example/typography/inline-code',
        },
        { title: '/example/typography/large', path: '/example/typography/large' },
        { title: '/example/typography/lead', path: '/example/typography/lead' },
        { title: '/example/typography/list', path: '/example/typography/list' },
        { title: '/example/typography/muted', path: '/example/typography/muted' },
        { title: '/example/typography/p', path: '/example/typography/p' },
        { title: '/example/typography/small', path: '/example/typography/small' },
        { title: '/example/typography/table', path: '/example/typography/table' },
        { title: '/example/markdown/editor', path: '/example/markdown/editor' }],
    },
  ];
  return (
    <aside className="max-w-sm">
      <ScrollArea className="h-[calc(100vh-144px-2.5rem)]">
        {examples?.map((example) => (
          <div className="y-4" key={example.title}>
            <h2 className="mb-2 text-lg font-semibold tracking-tight">
              {example.title}
            </h2>
            <div className="space-y-1 pb-4">
              {example.children?.map((child) => (
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleListItemClick(child?.path)}
                  key={`${example.title}-${child.title}`}
                >
                  {child?.icon}
                  {child.title}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </aside>
  );
}
