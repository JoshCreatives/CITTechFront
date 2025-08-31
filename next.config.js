const nextConfig = {
  output: 'standalone',
  outputFileTracingIncludes: {
    '/': ['./src/api/verification/templates/**/*'], // Adjust path to your templates
  },
};

export default nextConfig;