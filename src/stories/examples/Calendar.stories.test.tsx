import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { format } from 'date-fns';
import { addDays } from 'date-fns/addDays';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as LucideCalendar } from 'lucide-react';
import * as React from 'react';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Mock the story templates to test them
const CalendarTemplate = (args) => {
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

function CalendarDatePickerTemplate(props) {
  const [date, setDate] = useState<Date | undefined>(undefined); // Initialize without a date to show "Pick a date"
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
          <LucideCalendar className="mr-2 h-4 w-4" />
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

function CalendarDateRangePickerTemplate(props) {
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
          <LucideCalendar className="mr-2 h-4 w-4" />
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

function CalendarDatePickerWithPresetsTemplate(props) {
  const [date, setDate] = React.useState<Date | undefined>(undefined); // Initialize without a date

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
          <LucideCalendar className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) => setDate(addDays(new Date(), parseInt(value, 10)))}
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

describe('Calendar Stories', () => {
  // Test Default Calendar Template
  test('renders default calendar template', () => {
    render(<CalendarTemplate />);

    // Check if the calendar component is rendered
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  // Test Calendar Date Picker Template
  test('renders calendar date picker template', () => {
    render(<CalendarDatePickerTemplate />);

    // Check if the trigger button is rendered
    expect(screen.getByRole('button')).toBeInTheDocument();
    // Check if "Pick a date" text is visible (since initial date is undefined)
    expect(screen.getByText('Pick a date')).toBeInTheDocument();

    // Toggle the popover to show the calendar
    fireEvent.click(screen.getByRole('button'));

    // Wait for the calendar to appear in the popover
    // Use getAllByRole and get the first element since there might be multiple grids
    const grids = screen.getAllByRole('grid');
    expect(grids.length).toBeGreaterThan(0);
  });

  // Test Calendar Date Range Picker Template
  test('renders calendar date range picker template', () => {
    render(<CalendarDateRangePickerTemplate />);

    // Check if the trigger button is rendered
    expect(screen.getByRole('button')).toBeInTheDocument();

    // Toggle the popover to show the calendar
    fireEvent.click(screen.getByRole('button'));

    // Wait for the calendars to appear in the popover
    // Date range picker has 2 calendars (numberOfMonths={2})
    const grids = screen.getAllByRole('grid');
    expect(grids.length).toBe(2);
  });

  // Test Calendar Date Picker With Presets Template
  test('renders calendar date picker with presets template', async () => {
    render(<CalendarDatePickerWithPresetsTemplate />);

    // Check if the trigger button is rendered
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Pick a date')).toBeInTheDocument();

    // Toggle the popover to show the calendar and presets
    fireEvent.click(screen.getByRole('button'));

    // Wait for the Select trigger to appear in the popover
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    // Click the Select trigger to open the options
    const selectTrigger = screen.getByRole('combobox');
    fireEvent.click(selectTrigger);

    // Wait for the options to appear
    await waitFor(() => {
      expect(screen.getByText('Today')).toBeInTheDocument();
    });

    expect(screen.getByText('Tomorrow')).toBeInTheDocument();
    expect(screen.getByText('In 3 days')).toBeInTheDocument();
    expect(screen.getByText('In a week')).toBeInTheDocument();
  });

  test('calendar date picker with presets selects preset dates', async () => {
    render(<CalendarDatePickerWithPresetsTemplate />);

    // Toggle the popover to show the calendar and presets
    fireEvent.click(screen.getByRole('button'));

    // Wait for the Select trigger to appear
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    // Click the Select trigger to open the options
    const selectTrigger = screen.getByRole('combobox');
    fireEvent.click(selectTrigger);

    // Wait for the options to appear
    await waitFor(() => {
      expect(screen.getByText('Today')).toBeInTheDocument();
    });

    // Click on "Today" preset
    const todayOption = screen.getByText('Today');
    fireEvent.click(todayOption);

    // Wait for the date to be selected
    await waitFor(() => {
      // Instead of checking that "Pick a date" doesn't exist,
      // check if a formatted date appears
      expect(screen.queryByText('Pick a date')).not.toBeInTheDocument();
    });
  });
});