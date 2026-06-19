import { Bold } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Toggle } from '@/components/ui/toggle';

export default function ToggleDemo() {
  const { t } = useTranslation();
  return (
    <Toggle aria-label={t('example.toggle.toggleItalic')}>
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}
