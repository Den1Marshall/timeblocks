import type { NextConfig } from 'next';
import withPWAInit from '@ducanh2912/next-pwa';
import withBundleAnalyzerInit from '@next/bundle-analyzer';

const nextConfig: NextConfig = {};

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
});

const withBundleAnalyzer = withBundleAnalyzerInit({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(withPWA(nextConfig));
