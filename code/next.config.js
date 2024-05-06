// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude test files in client-side builds
      config.externals = config.externals.map((external) => {
        if (typeof external !== 'function') return external;
        return (ctx, req, cb) => (req.endsWith('.test.js') || req.endsWith('.test.tsx') ? cb() : external(ctx, req, cb));
      });
    }

    // Exclude test files from all builds
    config.module.rules.push({
      test: /\.test\.(js|jsx|ts|tsx)$/,
      loader: 'ignore-loader'
    });

    return config;
  },
};
