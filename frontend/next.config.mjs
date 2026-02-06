/** @type {import('next').NextConfig} */
const nextConfig = {
    // This tells Next.js to ignore React Router pages in src/pages
    experimental: {
        externalDir: true,
    },
};

export default nextConfig;
