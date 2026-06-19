import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SelectDemo() {
  const { t } = useTranslation();
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t('example.select.placeholder')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('example.select.label')}</SelectLabel>
          <SelectItem value="apple">{t('example.select.apple')}</SelectItem>
          <SelectItem value="banana">{t('example.select.banana')}</SelectItem>
          <SelectItem value="blueberry">{t('example.select.blueberry')}</SelectItem>
          <SelectItem value="grapes">{t('example.select.grapes')}</SelectItem>
          <SelectItem value="pineapple">{t('example.select.pineapple')}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
