import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images:{
  remotePatterns:[
    {hostname:'img.clerck.com'}
  ]
 }
};

export default nextConfig;
