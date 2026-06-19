import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function InputWithButton() {
  const { t } = useTranslation();
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder={t('example.input.withButton.placeholder')} />
      <Button type="submit">{t('example.input.withButton.button')}</Button>
    </div>
  );
}
