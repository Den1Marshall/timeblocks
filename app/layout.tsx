import type { Metadata, Viewport } from 'next';
import { startupImage } from './startupImage';
import {
  AriaRouterProvider,
  MotionProvider,
  NextUIProvider,
} from '@/app/providers';

import '@/app/index.css';

export const metadata: Metadata = {
  title: {
    template: '%s | TimeBlocks',
    default: 'TimeBlocks',
  },
  description: 'TimeBlocks',
  metadataBase: new URL('https://timeblocks-ashy.vercel.app/'),
  robots: 'all',
  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    url: '/',
    title: 'TimeBlocks',
    description: 'TimeBlocks',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TimeBlocks',
    description: 'TimeBlocks',
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    startupImage,
  },
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning={true}
      className='dark text-foreground bg-content1 h-[max(calc(100%_+_env(safe-area-inset-top)),_100%)] font-sans overscroll-none touch-pan-x touch-pan-y motion-safe:scroll-smooth'
    >
      <body className='h-full py-safe px-safe-or-5 overscroll-none antialiased'>
        <MotionProvider>
          <AriaRouterProvider>
            <NextUIProvider>{children}</NextUIProvider>
          </AriaRouterProvider>
        </MotionProvider>
      </body>
      {/* <GoogleAnalytics gaId="G-XYZ" /> */}
    </html>
  );
}
