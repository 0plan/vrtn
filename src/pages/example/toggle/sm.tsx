import { Toggle } from '@components/ui/toggle';

export default function ToggleSm() {
  return (
    <Toggle size="sm" aria-label="Toggle italic">
      <div className="i-lucide:italic h-4 w-4" />
    </Toggle>
  );
}
