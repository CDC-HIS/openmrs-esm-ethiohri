const { sep } = require("path");
const config = (module.exports = require("openmrs/default-webpack-config"));
// config.scriptRuleConfig.exclude =
//   sep == "/"
//     ? /(node_modules[^\/openmrs\-esm\-ohri\-commons\-lib])/
//     : /(node_modules[^\\openmrs\-esm\-ohri\-commons\-lib])/;
config.scriptRuleConfig.exclude =
  sep == "/"
    ? /(node_modules[^\/@openmrs\/esm\-patient\-common\-lib, ^\/openmrs\-esm\-ohri\-commons\-lib])/
    : /(node_modules[^\\@openmrs\/esm\-patient\-common\-lib, ^\\openmrs\-esm\-ohri\-commons\-lib])/;
module.exports = config;
