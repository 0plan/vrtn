import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export default function ToastDemo() {
  const { toast } = useToast();
  const { t } = useTranslation();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: t('example.toast.title'),
          description: t('example.toast.description'),
          action: (
            <ToastAction altText={t('example.toast.undoAltText')}>{t('example.toast.undo')}</ToastAction>
          ),
        });
      }}
    >
      {t('example.toast.button')}
    </Button>
  );
}
