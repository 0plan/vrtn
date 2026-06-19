import { useTranslation } from 'react-i18next';

import TypographyH1 from '@/pages/example/typography/h1';
import TypographyH2 from '@/pages/example/typography/h2';
import TypographyH3 from '@/pages/example/typography/h3';
import TypographyH4 from '@/pages/example/typography/h4';
import TypographyInlineCode from '@/pages/example/typography/inline-code';

export default function TypographyDemo() {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {t('example.typography.demo.title')}
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {t('example.typography.demo.intro')}
      </p>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {t('example.typography.demo.kingsPlanHeading')}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {t('example.typography.demo.kingsPlanBefore')}{' '}
        <a
          href="#"
          className="font-medium text-primary underline underline-offset-4"
        >
          {t('example.typography.demo.kingsPlanLink')}
        </a>
        {t('example.typography.demo.kingsPlanAfter')}
      </p>
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {t('example.typography.demo.quote')}
      </blockquote>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {t('example.typography.demo.jokeTaxHeading')}
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {t('example.typography.demo.jokeTaxParagraph')}
      </p>
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        <li>{t('example.typography.demo.item1')}</li>
        <li>{t('example.typography.demo.item2')}</li>
        <li>{t('example.typography.demo.item3')}</li>
      </ul>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {t('example.typography.demo.jesterParagraph')}
      </p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {t('example.typography.demo.revoltHeading')}
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {t('example.typography.demo.revoltParagraph')}
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {t('example.typography.demo.laughterParagraph')}
      </p>
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        {t('example.typography.demo.rebellionHeading')}
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {t('example.typography.demo.rebellionParagraph')}
      </p>
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                {t('example.typography.demo.colTreasury')}
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                {t('example.typography.demo.colHappiness')}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {t('example.typography.demo.row1Treasury')}
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {t('example.typography.demo.row1Happiness')}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {t('example.typography.demo.row2Treasury')}
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {t('example.typography.demo.row2Happiness')}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {t('example.typography.demo.row3Treasury')}
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {t('example.typography.demo.row3Happiness')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {t('example.typography.demo.repealParagraph')}
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {t('example.typography.demo.moralParagraph')}
      </p>
      <div>
        <p>{t('example.typography.demo.labelH1')}</p>
        <div className="py-2">
          <TypographyH1 />
        </div>
        <p>{t('example.typography.demo.labelH2')}</p>
        <div className="py-2">
          <TypographyH2 />
        </div>
        <p>{t('example.typography.demo.labelH3')}</p>
        <div className="py-2">
          <TypographyH3 />
        </div>
        <p>{t('example.typography.demo.labelH4')}</p>
        <div className="py-2">
          <TypographyH4 />
        </div>
      </div>
      <div>
        <p>{t('example.typography.demo.labelInlineCode')}</p>
        <TypographyInlineCode />
      </div>
    </div>
  );
}
