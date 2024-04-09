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
import { useState, useEffect } from 'react';
import NProgress from 'nprogress';
import { useTranslation } from 'react-i18next';

export default function SignIn({ setIsAuth, setStoreAuth }) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const signIn = () => new Promise((resolve) => {
    NProgress.start();
    setLoading(true);
    setTimeout(resolve, 1000);
  }).then(() => {
    NProgress.done();
    setLoading(false);
    setOpen(false);
    setIsAuth(true);
    localStorage.setItem('isAuth', true);
    setStoreAuth(true);
    toast({
      description: 'Signed in successfully!',
    });
  });
  const handleEmailKeyPress = (e) => {
    if (e.key === 'Enter') document.getElementById('password').focus();
  };
  const handlePasswordKeyPress = (e) => {
    if (e.key === 'Enter') signIn();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{t('signIn')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('signIn')}</DialogTitle>
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
          {loading ? (
            <Button onClick={signIn} disabled>
              Sign in
            </Button>
          ) : (
            <Button onClick={signIn}>Sign in</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
