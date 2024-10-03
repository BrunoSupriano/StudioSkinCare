/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/auth/login',
                permanent: true,
            },
        ]
    },
}

export default nextConfig;
