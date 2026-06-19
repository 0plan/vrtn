import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function InputWithLabel() {
  const { t } = useTranslation();
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">{t('example.input.withLabel.label')}</Label>
      <Input type="email" id="email" placeholder={t('example.input.withLabel.placeholder')} />
    </div>
  );
}
