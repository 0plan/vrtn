import { Italic } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Toggle } from '@/components/ui/toggle';

export default function ToggleOutline() {
  const { t } = useTranslation();
  return (
    <Toggle variant="outline" aria-label={t('example.toggle.outline.toggleItalic')}>
      <Italic className="h-4 w-4" />
    </Toggle>
  );
}
