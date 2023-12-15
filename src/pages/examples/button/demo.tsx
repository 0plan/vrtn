import { Button } from '@components/ui/button'
import { Loader2, Mail } from 'lucide-react'

export function ButtonDemo() {
  return (
    <div>
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
      <Button>
        <Mail className="mr-2 h-4 w-4" />
        Login with Email
      </Button>
    </div>
  )
}
