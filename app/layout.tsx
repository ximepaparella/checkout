import type { Metadata } from 'next';
import { Header } from '@/shared/ui/Header';
import { ErrorBoundaryWrapper } from './error-boundary-wrapper';
import '../styles/globals.scss';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Checkout | Inspire',
    template: '%s | Inspire',
  },
  description: 'Finalize sua compra de forma segura e rápida na Inspire. Compra 100% protegida.',
  keywords: ['checkout', 'compra', 'e-commerce', 'Inspire', 'pagamento seguro'],
  authors: [{ name: 'Inspire' }],
  creator: 'Inspire',
  publisher: 'Inspire',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'Inspire',
    title: 'Checkout | Inspire',
    description: 'Finalize sua compra de forma segura e rápida na Inspire. Compra 100% protegida.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Inspire Checkout',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Checkout | Inspire',
    description: 'Finalize sua compra de forma segura e rápida na Inspire. Compra 100% protegida.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0094ff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ErrorBoundaryWrapper>
          <Header />
          <main id="main-content" role="main">
            {children}
          </main>
        </ErrorBoundaryWrapper>
      </body>
    </html>
  );
}
