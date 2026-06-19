import { useTranslation } from 'react-i18next';

export default function TypographyTable() {
  const { t } = useTranslation();
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              {t('example.typography.table.colTreasury')}
            </th>
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
              {t('example.typography.table.colHappiness')}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {t('example.typography.table.row1Treasury')}
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {t('example.typography.table.row1Happiness')}
            </td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {t('example.typography.table.row2Treasury')}
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {t('example.typography.table.row2Happiness')}
            </td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {t('example.typography.table.row3Treasury')}
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {t('example.typography.table.row3Happiness')}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
