// next.config.ts

import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // @ts-ignore - Ignore type checking for webpack config modification
    config.module.rules.push({
      test: /\.mp3$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext]'
      }
    });
    return config;
  }
};

export default nextConfig;