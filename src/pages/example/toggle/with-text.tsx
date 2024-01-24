import { Toggle } from '@components/ui/toggle';

export function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle italic">
      <div className="i-lucide:italic mr-2 h-4 w-4" />
      Italic
    </Toggle>
  );
}
