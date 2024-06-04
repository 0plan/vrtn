import { Terminal } from 'lucide-react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { useTranslation } from 'react-i18next';

export default function AlertDemo() {
  const { t } = useTranslation();
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>{t('example.alert.title')}</AlertTitle>
      <AlertDescription>
        {t('example.alert.content')}
      </AlertDescription>
    </Alert>
  );
}
