import { useTranslation } from 'react-i18next';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function LabelDemo() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">{t('example.label.label')}</Label>
      </div>
    </div>
  );
}
