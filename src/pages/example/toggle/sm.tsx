import { Italic } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Toggle } from '@/components/ui/toggle';

export default function ToggleSm() {
  const { t } = useTranslation();
  return (
    <Toggle size="sm" aria-label={t('example.toggle.sm.toggleItalic')}>
      <Italic className="h-4 w-4" />
    </Toggle>
  );
}
