/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Exclude src/pages directory from build (contains React Router components)
        config.module.rules.push({
            test: /\.(jsx|js)$/,
            exclude: /src\/pages/,
        });

        return config;
    },
};

export default nextConfig;
