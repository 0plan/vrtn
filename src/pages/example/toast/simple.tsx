import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function ToastSimple() {
  const { toast } = useToast();
  const { t } = useTranslation();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: t('example.toast.simple.description'),
        });
      }}
    >
      {t('example.toast.simple.button')}
    </Button>
  );
}
