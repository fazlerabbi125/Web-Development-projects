/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // webpack(config) {
  //   config.module.rules.forEach((rule) => {
  //     const { oneOf } = rule;
  //     if (oneOf) {
  //       oneOf.forEach((one) => {
  //         if (!`${one.issuer?.and}`.includes('_app')) return;
  //         one.issuer.and = [path.resolve(__dirname)];
  //       });
  //     }
  //   })
  //   return config;
  // }, // for allowing component files to have stylesheets outside styles folder
}

module.exports = nextConfig
