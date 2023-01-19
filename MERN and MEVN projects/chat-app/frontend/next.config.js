/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

// For allowing component files to import and use global stylesheets outside of pages/__app file
// /** @type {import('next').NextConfig} */
// const path = require('path');
// const nextConfig = {
//   reactStrictMode: false,
//   webpack(config) {
//     config.module.rules.forEach(rule => {
//       const { oneOf } = rule;
//       if (oneOf) {
//         oneOf.forEach(one => {
//           if (!`${one.issuer?.and}`.includes('_app')) return;
//           one.issuer.and = [path.resolve(__dirname)];
//         });
//       }
//     });
//     return config;
//   }
// };

// module.exports = nextConfig;