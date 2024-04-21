/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    headers: async () => [
        {
            source: '/api/:path*',
            headers: [
                { key: 'Access-Control-Allow-Credentials', value: 'true' },
                { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin 
                {
                    key: 'Access-Control-Allow-Methods',
                    value: 'GET,DELETE,PATCH,POST,PUT',
                },
                {
                    key: 'Access-Control-Allow-Headers',
                    value:
                        'Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                },
            ],
        },
    ],
};

export default nextConfig;