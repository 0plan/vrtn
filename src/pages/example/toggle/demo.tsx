import { Toggle } from '@components/ui/toggle';

export default function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle italic">
      <div className="i-lucide:bold h-4 w-4" />
    </Toggle>
  );
}
