/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        // domains: ["example.com", "rezwan-rahim.web.app"],
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'rezwan-rahim.web.app',
                // pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'example.com',
                // pathname: '/images/**',
            }
        ]
    }
};

module.exports = nextConfig;
