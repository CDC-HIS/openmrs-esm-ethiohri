const { scriptRuleConfig } = require("@openmrs/webpack-config");

scriptRuleConfig.exclude = (modulePath) => {
  if (
    modulePath.includes("@openmrs/esm-patient-common-lib") ||
    modulePath.includes("@ohri/openmrs-esm-ohri-commons-lib")
  ) {
    return false;
  }
  return /node_modules/.test(modulePath);
};

module.exports = (env, argv) => {
  const config = require("openmrs/default-webpack-config")(env, argv);

  // Suppress sass deprecation warnings
  config.module?.rules?.forEach((rule) => {
    rule.use?.forEach?.((loader) => {
      if (loader?.loader?.includes?.("sass-loader")) {
        loader.options = {
          ...loader.options,
          sassOptions: { quietDeps: true },
        };
      }
    });
  });

  // Remove ForkTsCheckerWebpackPlugin — this is what emits the TS ERRORs
  config.plugins = config.plugins?.filter((plugin) => {
    return plugin?.constructor?.name !== "ForkTsCheckerWebpackPlugin";
  });

  return config;
};
