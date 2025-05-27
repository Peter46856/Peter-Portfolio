// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    
    images: {
        domains: [
            'open.cruip.com',
            'ucarecdn.com',
            'www.svgrepo.com',
            'images.unsplash.com',
            'res.cloudinary.com',
            'images.ctfassets.net'
        ]
    },
    webpack(config) {
        config
            .module
            .rules
            .push({test: /\.svg$/, use: ["@svgr/webpack"]});

        return config;
    }
}

module.exports = nextConfig;