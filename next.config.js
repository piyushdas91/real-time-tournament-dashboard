/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "feeds-100mb.s3-ap-southeast-1.amazonaws.com",
      "scores.iplt20.com",
      "ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com"
    ],
  },
};

module.exports = nextConfig;
