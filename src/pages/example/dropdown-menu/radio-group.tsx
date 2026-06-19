import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function DropdownMenuRadioGroupDemo() {
  const { t } = useTranslation();
  const [position, setPosition] = React.useState('bottom');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{t('example.dropdownMenu.radioGroup.open')}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t('example.dropdownMenu.radioGroup.panelPosition')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">{t('example.dropdownMenu.radioGroup.top')}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">{t('example.dropdownMenu.radioGroup.bottom')}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">{t('example.dropdownMenu.radioGroup.right')}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
