import { Toggle } from '@components/ui/toggle';

export function ToggleDisabled() {
  return (
    <Toggle aria-label="Toggle italic" disabled>
      <div className="i-lucide:underline h-4 w-4" />
    </Toggle>
  );
}
