const createExpoWebpackConfigAsync = require('@expo/webpack-config/webpack').default;

module.exports = async function (env: any, argv: any) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: { dangerouslyAddModulePathsToTranspile: ["esoftplay"] },
    },
    argv
  );
  // Customize the config before returning it.
  return config;
};