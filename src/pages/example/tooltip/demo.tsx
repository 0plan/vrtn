import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@/components/ui/tooltip';

export default function TooltipDemo() {
  const { t } = useTranslation();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" className="w-10 rounded-full p-0">
            <Plus className="h-4 w-4" />
            <span className="sr-only">{t('example.tooltip.add')}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('example.tooltip.addToLibrary')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
