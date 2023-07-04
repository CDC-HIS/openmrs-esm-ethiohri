/* eslint-disable unused-imports/no-unused-imports */
import {
  getAsyncLifecycle,
  defineConfigSchema,
  provide,
  getSyncLifecycle,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import ethiohriConfigOverrides from "./ethiohri-configuration-overrides.json";
import ethiohriConfig from "./ethiohri-config";
import {
  addToBaseFormsRegistry,
  registerControl,
} from "@openmrs/openmrs-form-engine-lib";
import formsRegistry from "./forms/forms-registry";
import {
  createDashboardGroup,
  createDashboardLink,
} from "@openmrs/esm-patient-common-lib";
import {
  CHILD_HEALTH_SUMMARY,
  CLINICAL_VISITS,
  HIV_CARE_AND_TREATMENT,
  HIV_TESTING_SERVICE_META,
  MATERNAL_HEALTH_SUMMARY,
  PMTCT_META,
  POST_META,
  PREP_META,
  PROGRAM_MANAGEMENT_META,
} from "./ethiohri-dashboard.meta";

export const moduleName = "@icap-ethiopia/esm-ethiohri-app";

export const options = { featureName: "ethiohri", moduleName };

export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
  // provide(ethiohriConfigOverrides);
  // provide(ethiohriConfig);

  // addToBaseFormsRegistry(formsRegistry);

  // registerControl({
  //   id: "eth-date",
  //   loadControl: () => import("./controls/date/ethiohri-date.component"),
  //   type: "eth-date",
  // });
}

export const patientDetailsButton = getAsyncLifecycle(
  () => import("./actions-buttons/test-patient-details-button.component"),
  options
);

export const attributeTags = getAsyncLifecycle(
  () => import("./patient-banner-tags/test-attribute-tags.component"),
  {
    featureName: "test-attribute-tags",
    moduleName,
  }
);
export const hivBaseline = getAsyncLifecycle(
  () => import("./views/hiv-baseline/hiv-baseline-summary.component"),
  {
    featureName: "hiv-baseline-summary",
    moduleName,
  }
);
export const activeMedications = getAsyncLifecycle(
  () => import("./views/medications/active-medications.component"),
  options
);
export const vitalsOverview = getAsyncLifecycle(
  () => import("./views/vitals/vitals-summary.component"),
  options
);
export const hivCareAndTreatmentMenu = getSyncLifecycle(
  createDashboardGroup(HIV_CARE_AND_TREATMENT),
  options
);
export const programManagementMenu = getSyncLifecycle(
  createDashboardLink(PROGRAM_MANAGEMENT_META),
  options
);
export const programManagementChart = getAsyncLifecycle(
  () =>
    import("./pages/program-management/program-managment-summary.component"),
  options
);
export const clinicalVisitsMenu = getSyncLifecycle(
  createDashboardLink(CLINICAL_VISITS),
  options
);
export const clinicalVisitsChart = getAsyncLifecycle(
  () => import("./pages/visits/visits-summary.component"),
  options
);
export const pmtctMenu = getSyncLifecycle(
  createDashboardGroup(PMTCT_META),
  options
);
export const maternalHealthMenu = getSyncLifecycle(
  createDashboardLink(MATERNAL_HEALTH_SUMMARY),
  options
);
export const maternalHealthChart = getAsyncLifecycle(
  () => import("./pages/pmtct/maternal-health.component"),
  options
);
export const childHealthMenu = getSyncLifecycle(
  createDashboardLink(CHILD_HEALTH_SUMMARY),
  options
);
export const childHealthChart = getAsyncLifecycle(
  () => import("./pages/child-care/child-care.component"),
  options
);
export const prepMenu = getSyncLifecycle(
  createDashboardLink(PREP_META),
  options
);
export const prepChart = getAsyncLifecycle(
  () => import("./pages/pre-exposure/pre-exposure-summary.component"),
  options
);
export const pepMenu = getSyncLifecycle(
  createDashboardLink(POST_META),
  options
);
export const pepChart = getAsyncLifecycle(
  () => import("./pages/post-exposure/post-exposure.component"),
  options
);
export const hivTestingServiceMenu = getSyncLifecycle(
  createDashboardLink(HIV_TESTING_SERVICE_META),
  options
);
export const hivTestingServiceChart = getAsyncLifecycle(
  () =>
    import("./pages/hiv-testing-service/hiv-testing-service-summary.component"),
  options
);
