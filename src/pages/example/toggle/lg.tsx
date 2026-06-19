import { Italic } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Toggle } from '@/components/ui/toggle';

export default function ToggleLg() {
  const { t } = useTranslation();
  return (
    <Toggle size="lg" aria-label={t('example.toggle.lg.toggleItalic')}>
      <Italic className="h-4 w-4" />
    </Toggle>
  );
}
