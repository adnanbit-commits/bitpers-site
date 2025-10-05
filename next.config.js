/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ["https://checkout.razorpay.com"],
  },
};
module.exports = nextConfig;
