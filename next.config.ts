import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://assets.aceternity.com/**"),
      new URL("https://www.gravatar.com/**"),
      new URL("https://lh3.googleusercontent.com/**"),
      new URL("https://static.vecteezy.com/**"),
    ],
  },
};

export default nextConfig;
