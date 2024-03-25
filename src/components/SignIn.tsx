import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export default function SignIn() {
  const { toast } = useToast();

  const signIn = () => {
    toast({
      description: 'Signed in successfully!',
    });
  };
  const handleEmailKeyPress = (e) => {
    if (e.key === 'Enter') document.getElementById('password').focus();
  };
  const handlePasswordKeyPress = (e) => {
    if (e.key === 'Enter') signIn();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription>
            Sign in to your account to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="items-center mb-4">
            <Label htmlFor="email" className="text-right">
              Email address
            </Label>
            <Input
              className="mt-2"
              id="email"
              enterKeyHint="next"
              onKeyDown={handleEmailKeyPress}
            />
          </div>
          <div className="items-center mb-1">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              className="mt-2"
              id="password"
              type="password"
              enterKeyHint="done"
              onKeyDown={handlePasswordKeyPress}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={signIn}>Sign in</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
