const config = require("openmrs/default-webpack-config");

// @openmrs/esm-patient-common-lib ships source-only (no dist build),
// so we must allow swc-loader to transpile its TypeScript files.
const { scriptRuleConfig } = require("@openmrs/webpack-config");
scriptRuleConfig.exclude =
  /node_modules\/(?!@openmrs\/esm-patient-common-lib\/)/;

module.exports = config;
