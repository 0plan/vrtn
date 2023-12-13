import { Checkbox } from '@components/ui/checkbox'
import { CheckboxDisabled } from '~/pages/examples/checkbox/disabled.tsx'
import { CheckboxWithText } from '~/pages/examples/checkbox/with-text.tsx'

export function CheckboxDemo() {
  return (
    <div>
      <p>Default Checkbox</p>
      <div className={'py-2'}>
        <div className='flex items-center space-x-2'>
          <Checkbox id='terms' />
          <label
            htmlFor='terms'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Accept terms and conditions
          </label>
        </div>
      </div>
      <p>Disabled Checkbox</p>
      <div className={'py-2'}><CheckboxDisabled /></div>
      <p>Checkbox With Text</p>
      <div className={'py-2'}><CheckboxWithText /></div>
    </div>
  )
}
