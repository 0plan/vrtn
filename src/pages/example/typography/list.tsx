import { useTranslation } from 'react-i18next';

export default function TypographyList() {
  const { t } = useTranslation();
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      <li>{t('example.typography.list.item1')}</li>
      <li>{t('example.typography.list.item2')}</li>
      <li>{t('example.typography.list.item3')}</li>
    </ul>
  );
}
