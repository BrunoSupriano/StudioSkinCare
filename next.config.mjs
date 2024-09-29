/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/ERP/Agendamento',  // Define a nova "home"
                permanent: true,
            },
        ]
    },
}

export default nextConfig;
