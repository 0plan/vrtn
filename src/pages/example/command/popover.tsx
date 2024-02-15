import * as React from 'react';

import { Button } from '@components/ui/button';
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from '@components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { cn } from '~/lib/utils.ts';

type Status = {
  value: string
  label: string
  icon: string
}

const statuses: Status[] = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: 'i-lucide:help-circle',
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: 'i-lucide:circle',
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: 'i-lucide:arrow-up-circle',
  },
  {
    value: 'done',
    label: 'Done',
    icon: 'i-lucide:check-circle-2',
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: 'i-lucide:x-circle',
  },
];

export default function CommandPopover() {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null,
  );

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Status</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedStatus ? (
              <>
                <div className={`${selectedStatus.icon} mr-2 h-4 w-4 shrink-0`} />
                {selectedStatus.label}
              </>
            ) : (
              <>+ Set status</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
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
                    <div
                      className={`${status.icon}
                      ${cn(
                        'mr-2 h-4 w-4',
                        status.value === selectedStatus?.value
                          ? 'opacity-100'
                          : 'opacity-40',
                      )}`}
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
