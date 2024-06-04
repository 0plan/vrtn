import {
  Calculator, Calendar, CreditCard, Settings, Smile, User,
} from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { useTranslation } from 'react-i18next';

interface ICommandItem {
  icon: JSX.Element;
  label: string;
  shortcut?: string;
}
interface ICommandGroup {
  title: string;
  items: ICommandItem[];
}
export default function CommandDemo() {
  const { t } = useTranslation();
  const commands: ICommandGroup[] = [
    {
      title: t('example.command.demo.suggestions'),
      items: [
        {
          icon: <Calendar className="mr-2 h-4 w-4" />,
          label: t('example.command.demo.calendar'),
        },
        {
          icon: <Smile className="mr-2 h-4 w-4" />,
          label: t('example.command.demo.searchEmoji'),
        },
        {
          icon: <Calculator className="mr-2 h-4 w-4" />,
          label: t('example.command.demo.calculator'),
        },
      ],
    },
    {
      title: t('example.command.demo.settings'),
      items: [
        {
          icon: <User className="mr-2 h-4 w-4" />,
          label: t('example.command.demo.profile'),
          shortcut: '⌘P',
        },
        {
          icon: <CreditCard className="mr-2 h-4 w-4" />,
          label: t('example.command.demo.billing'),
          shortcut: '⌘B',
        },
        {
          icon: <Settings className="mr-2 h-4 w-4" />,
          label: t('example.command.demo.settings'),
          shortcut: '⌘S',
        },
      ],
    },
  ];
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder={t('example.command.demo.search.placeholder')} />
      <CommandList>
        <CommandEmpty>{t('example.command.demo.empty')}</CommandEmpty>
        {commands.map((group) => (
          <CommandGroup heading={group.title}>
            {group.items.map((item) => (
              <CommandItem>
                {item.icon}
                <span>{item.label}</span>
                {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
              </CommandItem>
            ))}
          </CommandGroup>

        ))}
      </CommandList>
    </Command>
  );
}
