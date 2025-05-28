// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export', // This is commented out, so it won't export as static HTML
   // distDir: 'build', // This will put your build output in a 'build' folder instead of '.next'
    reactStrictMode: true,
    basePath: process.env.NODE_ENV === 'production' ? '/Peter-Portfolio' : '',
    images: { // This is the single, correct images configuration
        unoptimized: true, // Keep this if you're deploying to GitHub Pages or purely static environments
        remotePatterns: [
            { protocol: 'https', hostname: 'open.cruip.com' },
            { protocol: 'https', hostname: 'ucarecdn.com' },
            { protocol: 'https', hostname: 'www.svgrepo.com' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'res.cloudinary.com' },
            { protocol: 'https', hostname: 'images.ctfassets.net' }
        ]
    },
    webpack(config) {
        config
            .module
            .rules
            .push({ test: /\.svg$/, use: ["@svgr/webpack"] });

        return config;
    }
}

module.exports = nextConfig;