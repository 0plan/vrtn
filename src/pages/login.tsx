import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import authStore, { demoAccount } from '@/stores/auth';

export default function Login() {
  const isAuth = authStore(state => state.isAuth);
  return isAuth ? <Navigate to="/dashboard" replace /> : <LoginForm />;
}

function LoginForm() {
  const { t } = useTranslation('login');
  const login = authStore(state => state.login);
  const [invalid, setInvalid] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    setInvalid(!login(String(fields.get('email')), String(fields.get('password'))));
  }

  return (
    <section className="traffic-login" aria-labelledby="login-title">
      <Helmet><title>{`${t('title')} | ${t('common:appName')}`}</title></Helmet>
      <h1 id="login-title">{t('title')}</h1>
      <p className="traffic-description">{t('intro')}</p>
      <form onSubmit={submit} onChange={() => setInvalid(false)}>
        <div className="traffic-field">
          <Label htmlFor="email">{t('email')}</Label>
          <Input id="email" name="email" type="email" autoComplete="username" required
            defaultValue={demoAccount.email} aria-invalid={invalid} aria-describedby={invalid ? 'login-error' : undefined} />
        </div>
        <div className="traffic-field">
          <Label htmlFor="password">{t('password')}</Label>
          <Input id="password" name="password" type="password" autoComplete="current-password" required
            defaultValue={demoAccount.password} aria-invalid={invalid} aria-describedby={invalid ? 'login-error' : undefined} />
        </div>
        {invalid && <p id="login-error" role="alert">{t('invalid')}</p>}
        <Button type="submit" className="traffic-submit">{t('title')}</Button>
      </form>
      <aside className="traffic-demo">
        <h2>{t('account')}</h2>
        <dl>
          <div><dt>{t('email')}</dt><dd>{demoAccount.email}</dd></div>
          <div><dt>{t('password')}</dt><dd>{demoAccount.password}</dd></div>
        </dl>
      </aside>
    </section>
  );
}
