import { Italic } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Toggle } from '@/components/ui/toggle';

export default function ToggleWithText() {
  const { t } = useTranslation();
  return (
    <Toggle aria-label={t('example.toggle.withText.toggleItalic')}>
      <Italic className="mr-2 h-4 w-4" />
      {t('example.toggle.withText.italic')}
    </Toggle>
  );
}
