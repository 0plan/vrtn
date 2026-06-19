import { Underline } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Toggle } from '@/components/ui/toggle';

export default function ToggleDisabled() {
  const { t } = useTranslation();
  return (
    <Toggle aria-label={t('example.toggle.disabled.toggleItalic')} disabled>
      <Underline className="h-4 w-4" />
    </Toggle>
  );
}
