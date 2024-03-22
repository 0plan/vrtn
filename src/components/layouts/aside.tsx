import { Button } from '@/components/ui/button.tsx';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { IExample } from '@/data/example.ts';

export default function Aside({ examples } : { examples: IExample[] }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setPath] = useState(location.pathname);
  const handleListItemClick = (path: string) => {
    navigate(path);
    setPath(path);
  };

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
