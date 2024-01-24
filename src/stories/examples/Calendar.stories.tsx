import type { ComponentStory, Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@components/ui/calendar.tsx';
import * as React from 'react';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover.tsx';
import { Button } from '@components/ui/button.tsx';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@components/ui/select.tsx';
import { cn } from '~/lib/utils.ts';

const meta = {
  title: 'Examples/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>

const CalendarTemplate: ComponentStory<typeof Calendar> = (args) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Calendar
      {...args}
      mode="single"
      className="rounded-md border"
      selected={date}
      onSelect={setDate}
    />
  );
};
function CalendarDatePickerTemplate(args) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <div className="i-lucide:calendar mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
function CalendarDateRangePickerTemplate(args) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          className={cn(
            'w-[300px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <div className="i-lucide:calendar mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'LLL dd, y')} -{' '}
                {format(date.to, 'LLL dd, y')}
              </>
            ) : (
              format(date.from, 'LLL dd, y')
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}

function CalendarDatePickerWithPresetsTemplate(args) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <div className="i-lucide:calendar mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export const DefaultCalendar = CalendarTemplate.bind({});
export const CalendarDatePicker = CalendarDatePickerTemplate.bind({});
export const CalendarDateRangePicker = CalendarDateRangePickerTemplate.bind({});
export const CalendarDatePickerWithPresets = CalendarDatePickerWithPresetsTemplate.bind({});
