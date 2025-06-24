import type { NextConfig } from "next";

const AppEnv = process.env.NEXT_APP_ENV || 'prod';
const isDev = /dev/i.test(AppEnv);
const isProd = /prod/i.test(AppEnv);

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    compiler:{
        removeConsole: isProd
    },
    output: 'standalone',
    async rewrites() {
        return isDev ? [
            {
                source: process.env.NEXT_PUBLIC_API_URL+'/:path*',
                destination: process.env.NEXT_API_PROXY + '/:path*'
            }
        ]: []
    }
};

export default nextConfig;
