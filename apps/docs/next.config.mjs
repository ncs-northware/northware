import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // biome-ignore lint/suspicious/useAwait: redirects is async
  redirects: async () => {
    return [
      { source: "/apps", destination: "/apps/docs", permanent: true },
      { source: "/packages", destination: "/packages/auth", permanent: true },
    ];
  },
};

export default withMDX(config);
