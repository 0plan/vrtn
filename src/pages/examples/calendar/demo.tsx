import * as React from 'react'

import { Calendar } from '@components/ui/calendar'
import { CalendarDatePicker } from '~/pages/examples/calendar/date-picker.tsx'
import { CalendarDateRangePicker } from '~/pages/examples/calendar/date-range-picker.tsx'
import { CalendarDatePickerWithPresets } from '~/pages/examples/calendar/with-presets.tsx'

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div>
      <p className={'py-3'}>Default Calendar</p>
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
      <p className={'py-3'}>Date Picker</p>
      <CalendarDatePicker />
      <p className={'py-3'}>Date Range Picker</p>
      <CalendarDateRangePicker />
      <p className={'py-3'}>Date Picker With Presets</p>
      <CalendarDatePickerWithPresets />
    </div>
  )
}
