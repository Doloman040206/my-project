import '@/styles/global.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export function reportWebVitals(metric: {
  id: string;
  name: string;
  startTime?: number;
  value: number;
  label: string;
}) {
  if (typeof window !== 'undefined') {
    navigator.sendBeacon?.('/api/metrics', JSON.stringify(metric)) ||
      fetch('/api/metrics', {
        method: 'POST',
        body: JSON.stringify(metric),
        headers: { 'Content-Type': 'application/json' },
      }).catch(() => {});
  }

  console.warn('web-vitals:', metric);
}

export default MyApp;
