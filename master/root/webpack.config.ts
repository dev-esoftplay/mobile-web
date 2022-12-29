const createExpoWebpackConfigAsync = require('@expo/webpack-config/webpack').default;
const transpileModule = require('./transpileModule')
module.exports = async function (env: any, argv: any) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      dangerouslyAddModulePathsToTranspile: transpileModule ? ["esoftplay", ...transpileModule] : ["esoftplay"]
    },
    argv
  );
  // Customize the config before returning it.
  return config;
};