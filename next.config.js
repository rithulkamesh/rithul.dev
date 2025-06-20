/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
 async redirects() {
    return [
      {
        source: '/ewX9On',
        destination: 'https://docs.google.com/presentation/d/1ikxgRezHBs18AY1z9lDwUmd_2aXWaKQ-/edit?usp=sharing&ouid=106419837811012127385&rtpof=true&sd=true',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
