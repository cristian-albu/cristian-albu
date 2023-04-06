/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "https://avatars.githubusercontent.com",
      "avatars.githubusercontent.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
