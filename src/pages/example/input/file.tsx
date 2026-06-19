import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function InputFile() {
  const { t } = useTranslation();
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">{t('example.input.file.label')}</Label>
      <Input id="picture" type="file" />
    </div>
  );
}
