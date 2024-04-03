import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PanelLeftOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IExample } from '@/data/example';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Aside({ examples } : { examples: IExample[] }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  const handleListItemClick = (path: string) => {
    navigate(path);
    setPath(path);
  };

  return (
    <aside>
      <Sheet>
        <SheetTrigger asChild className="sm:hidden">
          <PanelLeftOpen />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="mb-4">
            {t('menu.example')}
          </SheetHeader>
          <ScrollArea className="h-full">
            {examples?.map((example) => (
              <div className="y-4" key={example.title}>
                <h2 className="mb-2 text-lg font-semibold tracking-tight">
                  {example.title}
                </h2>
                <div className="space-y-1 pb-4">
                  {example.children?.map((child) => (
                    <SheetClose
                      key={`${example.title}-${child.title}`}
                      asChild
                    >
                      <Button
                        type="submit"
                        variant={child.path === path ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => handleListItemClick(child?.path)}
                      >
                        {child.title}
                      </Button>
                    </SheetClose>

                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <ScrollArea className="h-[calc(100vh-144px-2.5rem)] max-w-sm hidden sm:block">
        {examples?.map((example) => (
          <div className="y-4" key={example.title}>
            <h2 className="mb-2 text-lg font-semibold tracking-tight">
              {example.title}
            </h2>
            <div className="space-y-1 pb-4">
              {example.children?.map((child) => (
                <Button
                  variant={child.path === path ? 'secondary' : 'ghost'}
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
