import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export default function ToastWithAction() {
  const { toast } = useToast();
  const { t } = useTranslation();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: t('example.toast.withAction.title'),
          description: t('example.toast.withAction.description'),
          action: <ToastAction altText={t('example.toast.withAction.action')}>{t('example.toast.withAction.action')}</ToastAction>,
        });
      }}
    >
      {t('example.toast.withAction.button')}
    </Button>
  );
}
