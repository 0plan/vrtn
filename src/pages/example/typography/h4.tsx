import { useTranslation } from 'react-i18next';

export default function TypographyH4() {
  const { t } = useTranslation();
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {t('example.typography.h4.heading')}
    </h4>
  );
}
