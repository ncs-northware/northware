import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // biome-ignore lint/suspicious/useAwait: redirects is async
};

export default withMDX(config);
