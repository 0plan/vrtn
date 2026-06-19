import { useTranslation } from 'react-i18next';

export default function TypographyH3() {
  const { t } = useTranslation();
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {t('example.typography.h3.heading')}
    </h3>
  );
}
