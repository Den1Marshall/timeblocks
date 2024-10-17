import type { Metadata, Viewport } from 'next';
import '@/app/index.css';
import { startupImage } from './startupImage';
import { AriaRouterProvider, FramerMotionProvider } from '@/app/providers';

export const metadata: Metadata = {
  title: {
    template: '%s | Next.js Boilerplate',
    default: 'Next.js Boilerplate',
  },
  description: 'Next.js Boilerplate',
  metadataBase: new URL('https://nextjs-boilerplate-gules-pi.vercel.app'),
  robots: 'all',
  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    url: '/',
    title: 'Next.js Boilerplate',
    description: 'Next.js Boilerplate',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Next.js Boilerplate',
    description: 'Next.js Boilerplate',
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
      className='h-[max(calc(100%_+_env(safe-area-inset-top)),_100%)] font-sans overscroll-none touch-pan-x touch-pan-y motion-safe:scroll-smooth'
    >
      <body className='h-full py-safe px-safe-or-5 dark:bg-black dark:text-white overscroll-none'>
        <FramerMotionProvider>
          <AriaRouterProvider>{children}</AriaRouterProvider>
        </FramerMotionProvider>
      </body>
      {/* <GoogleAnalytics gaId="G-XYZ" /> */}
    </html>
  );
}
