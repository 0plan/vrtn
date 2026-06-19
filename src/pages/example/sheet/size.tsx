import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const SHEET_SIZES = ['sm', 'default', 'lg', 'xl', 'full', 'content'] as const;

type SheetSize = (typeof SHEET_SIZES)[number]

export default function SheetSize() {
  const { t } = useTranslation();
  const [size, setSize] = useState<SheetSize>('default');
  return (
    <div className="flex flex-col space-y-8">
      <RadioGroup
        defaultValue={size}
        onValueChange={(value) => setSize(value as SheetSize)}
      >
        <div className="grid grid-cols-2 gap-2">
          {SHEET_SIZES.map((size, index) => (
            <div
              key={`${size}-${index}`}
              className="flex items-center space-x-2"
            >
              <RadioGroupItem value={size} id={size} />
              <Label htmlFor={size}>{size}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>
      <Sheet>
        <SheetTrigger asChild>
          <Button>{t('example.sheet.size.openSheet', { size })}</Button>
        </SheetTrigger>
        <SheetContent side="right" size={size}>
          <SheetHeader>
            <SheetTitle>{t('example.sheet.size.title')}</SheetTitle>
            <SheetDescription>
              {t('example.sheet.size.description')}
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {t('example.sheet.size.name')}
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                {t('example.sheet.size.username')}
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">{t('example.sheet.size.saveChanges')}</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
