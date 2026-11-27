import './index.css';
import { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import '@/lib/locales';
import { createRoot } from 'react-dom/client';
import { Routes } from '@generouted/react-router';

createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <Suspense fallback={null}><Routes /></Suspense>
  </HelmetProvider>,
);
