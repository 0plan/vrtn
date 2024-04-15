import './index.css';
import '@/lib/dark-mode';
import { HelmetProvider } from 'react-helmet-async';
import '@/lib/locales';
import { createRoot } from 'react-dom/client';
import { Routes } from '@generouted/react-router';
import 'nprogress/nprogress.css';
import '@/style/nprogress.css';

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <Routes />
  </HelmetProvider>,
);
