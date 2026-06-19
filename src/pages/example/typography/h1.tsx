import { useTranslation } from 'react-i18next';

export default function TypographyH1() {
  const { t } = useTranslation();
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {t('example.typography.h1.heading')}
    </h1>
  );
}
