import './index.css';
import '~/lib/dark-mode.ts';
import 'virtual:uno.css';
import { HelmetProvider } from 'react-helmet-async';
import '~/lib/locales';
import { createRoot } from 'react-dom/client';
import { Routes } from '@generouted/react-router';

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <Routes />
  </HelmetProvider>,
);
