import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function ToastWithTitle() {
  const { toast } = useToast();
  const { t } = useTranslation();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: t('example.toast.withTitle.title'),
          description: t('example.toast.withTitle.description'),
        });
      }}
    >
      {t('example.toast.withTitle.button')}
    </Button>
  );
}
