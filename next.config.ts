import type {NextConfig} from 'next';
// Import withSentryConfig as a named export
import { withSentryConfig } from '@sentry/nextjs';
import withGenkit from '@genkit-ai/next';

import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withSentryConfig(
    bundleAnalyzer(nextConfig)
  );
