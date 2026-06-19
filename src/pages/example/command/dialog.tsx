import * as React from 'react';

import {
  Calculator, Calendar, CreditCard, Settings, Smile, User,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';

export default function CommandDialogDemo() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && e.metaKey) {
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <p className="text-sm text-muted-foreground">
        {t('example.command.dialog.press')}{' '}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t('example.command.dialog.inputPlaceholder')} />
        <CommandList>
          <CommandEmpty>{t('example.command.dialog.noResults')}</CommandEmpty>
          <CommandGroup heading={t('example.command.dialog.suggestions')}>
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <span>{t('example.command.dialog.calendar')}</span>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>{t('example.command.dialog.searchEmoji')}</span>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <span>{t('example.command.dialog.calculator')}</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t('example.command.dialog.settings')}>
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>{t('example.command.dialog.profile')}</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>{t('example.command.dialog.billing')}</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>{t('example.command.dialog.settings')}</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
