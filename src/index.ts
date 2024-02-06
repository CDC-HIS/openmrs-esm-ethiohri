/* eslint-disable unused-imports/no-unused-imports */
import {
  getAsyncLifecycle,
  defineConfigSchema,
  getSyncLifecycle,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import {
  registerControl,
  registerExpressionHelper,
} from "@openmrs/openmrs-form-engine-lib";
import {
  createDashboardGroup,
  createDashboardLink,
} from "@openmrs/esm-patient-common-lib";
import {
  CHILD_HEALTH_SUMMARY,
  CLINICAL_VISITS,
  HIV_CARE_AND_TREATMENT,
  HIV_TESTING_SERVICE_META,
  INDEX_CASE_TESTING_META,
  PMTCT_META,
  POST_META,
  PREP_META,
  PROGRAM_MANAGEMENT_META,
  MOTHER_HEALTH_SUMMARY,
} from "./ethiohri-dashboard.meta";
import {
  CalcNextVisitDate,
  CalcTreatmentEndDate,
  CalcMonthsOnART,
  CalcViralLoadStatus,
  CalcAdultNutritionalStatus,
  CalcNutritionalScreening,
  CalcBMI,
  getGender,
  getIdentifier,
  calcEGFR,
} from "./custom-expressions";
import {
  createConditionalDashboardGroup,
  createConditionalDashboardLink,
} from "@ohri/openmrs-esm-ohri-commons-lib";

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
  registerExpressionHelper("CustomNextVisitDateCalc", CalcNextVisitDate);
  registerExpressionHelper("CustomTreatmentEndDateCalc", CalcTreatmentEndDate);
  registerExpressionHelper("CustomMonthsOnARTCalc", CalcMonthsOnART);
  registerExpressionHelper("CustomViralLoadStatusCalc", CalcViralLoadStatus);
  registerExpressionHelper(
    "CustomAdultNutritionalStatusCalc",
    CalcAdultNutritionalStatus
  );
  registerExpressionHelper(
    "CustomNutritionalScreeningCalc",
    CalcNutritionalScreening
  );
  registerExpressionHelper("CustomBMICalc", CalcBMI);
  registerExpressionHelper("getGender", getGender);
  registerExpressionHelper("getIdentifier", getIdentifier);
  registerExpressionHelper("calcEGFR", calcEGFR);

  registerControl({
    name: "eth-date",
    load: () => import("./controls/date/ethiohri-date.component"),
    type: "eth-date",
  });
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
export const ethiohriActiveMedications = getAsyncLifecycle(
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
export const facilityName = getAsyncLifecycle(
  () => import("./views/navbar/facility-name.component"),
  options
);
export const programManagementMenu = getSyncLifecycle(
  createDashboardLink({
    ...PROGRAM_MANAGEMENT_META,
    moduleName,
  }),
  options
);

export const programManagementChart = getAsyncLifecycle(
  () =>
    import("./pages/program-management/program-managment-summary.component"),
  options
);
export const clinicalVisitsMenu = getSyncLifecycle(
  createDashboardLink({
    ...CLINICAL_VISITS,
    moduleName,
  }),
  options
);
export const clinicalVisitsChart = getAsyncLifecycle(
  () => import("./pages/visits/visits-summary.component"),
  options
);

export const pmtctMenu = getSyncLifecycle(
  createConditionalDashboardGroup(PMTCT_META),
  options
);
export const childHealthMenu = getSyncLifecycle(
  createConditionalDashboardLink({
    ...CHILD_HEALTH_SUMMARY,
    moduleName,
  }),
  options
);
export const childHealthChart = getAsyncLifecycle(
  () => import("./pages/pmtct/child/pmtct-child.component"),
  options
);
export const motherHealthMenu = getSyncLifecycle(
  createConditionalDashboardLink({
    ...MOTHER_HEALTH_SUMMARY,
    moduleName,
  }),
  options
);
export const motherHealthChart = getAsyncLifecycle(
  () => import("./pages/pmtct/mother/pmtct-mother.component"),
  options
);
export const prepMenu = getSyncLifecycle(
  createDashboardLink({
    ...PREP_META,
    moduleName,
  }),
  options
);
export const prepChart = getAsyncLifecycle(
  () => import("./pages/pre-exposure/pre-exposure-summary.component"),
  options
);
export const pepMenu = getSyncLifecycle(
  createDashboardLink({
    ...POST_META,
    moduleName,
  }),
  options
);
export const pepChart = getAsyncLifecycle(
  () => import("./pages/post-exposure/post-exposure.component"),
  options
);
export const hivTestingServiceMenu = getSyncLifecycle(
  createDashboardLink({
    ...HIV_TESTING_SERVICE_META,
    moduleName,
  }),
  options
);
export const hivTestingServiceChart = getAsyncLifecycle(
  () =>
    import("./pages/hiv-testing-service/hiv-testing-service-summary.component"),
  options
);
export const indexCaseTestingMenu = getSyncLifecycle(
  createDashboardLink({
    ...INDEX_CASE_TESTING_META,
    moduleName,
  }),
  options
);
export const indexCaseTestingChart = getAsyncLifecycle(
  () =>
    import("./pages/index-case-testing/index-case-testing-summary.component"),
  options
);
