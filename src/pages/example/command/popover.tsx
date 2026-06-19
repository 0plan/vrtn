import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  ArrowUpCircle, CheckCircle2, Circle, HelpCircle, LucideIcon, XCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type Status = {
  value: string
  label: string
  icon: LucideIcon
}

export default function CommandPopover() {
  const { t } = useTranslation();
  const statuses: Status[] = [
    {
      value: 'backlog',
      label: t('example.command.popover.backlog'),
      icon: HelpCircle,
    },
    {
      value: 'todo',
      label: t('example.command.popover.todo'),
      icon: Circle,
    },
    {
      value: 'in progress',
      label: t('example.command.popover.inProgress'),
      icon: ArrowUpCircle,
    },
    {
      value: 'done',
      label: t('example.command.popover.done'),
      icon: CheckCircle2,
    },
    {
      value: 'canceled',
      label: t('example.command.popover.canceled'),
      icon: XCircle,
    },
  ];
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null,
  );

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">{t('example.command.popover.status')}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedStatus ? (
              <>
                <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                {selectedStatus.label}
              </>
            ) : (
              <>+ {t('example.command.popover.setStatus')}</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder={t('example.command.popover.changeStatusPlaceholder')} />
            <CommandList>
              <CommandEmpty>{t('example.command.popover.noResults')}</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value)
                          || null,
                      );
                      setOpen(false);
                    }}
                  >
                    <status.icon
                      className={cn(
                        'mr-2 h-4 w-4',
                        status.value === selectedStatus?.value
                          ? 'opacity-100'
                          : 'opacity-40',
                      )}
                    />
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
