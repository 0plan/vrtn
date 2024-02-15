import { Toggle } from '@components/ui/toggle';

export default function ToggleOutline() {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <div className="i-lucide:italic h-4 w-4" />
    </Toggle>
  );
}
