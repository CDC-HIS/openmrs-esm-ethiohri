/* eslint-disable unused-imports/no-unused-imports */
import {
  getAsyncLifecycle,
  defineConfigSchema,
  provide,
  getSyncLifecycle,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import { registerControl, registerExpressionHelper } from "@openmrs/openmrs-form-engine-lib";
import {
  createDashboardGroup,
  createDashboardLink,
} from "@openmrs/esm-patient-common-lib";
import {
  CHILD_HEALTH_SUMMARY,
  CLINICAL_VISITS,
  FACILITY_NAME,
  HIV_CARE_AND_TREATMENT,
  HIV_TESTING_SERVICE_META,
  INDEX_CASE_TESTING_META,
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

function DispensedDoseInNumber(arvDispensedInDays: string) {
  if (arvDispensedInDays == 'fba421cf-a483-4329-b8b1-6a3ef16081bc') {
    return 30;
  } else if (arvDispensedInDays == '75d94023-7804-44f8-9998-9d678488af3e') {
    return 60;
  } else if (arvDispensedInDays == '4abbd98d-0c07-42f4-920c-7bbf0f5824dc') {
    return 90;
  } else if (arvDispensedInDays == '684c450f-878b-4b96-ab1b-2b539c30f033') {
    return 120;
  } else if (arvDispensedInDays == 'e5f7cc4d-922a-4838-8c75-af9bdbb59bc8') {
    return 180;
  }
  else {
    return 0;
  }
}

function CalcNextVisitDate(followupDate: Date, arvDispensedInDays: string) {
  let dispensedDoseReturned = DispensedDoseInNumber(arvDispensedInDays);
  let resultNextVisitDate = {};
  if (followupDate && arvDispensedInDays) {
    resultNextVisitDate = new Date(followupDate.getTime() + dispensedDoseReturned * 24 * 60 * 60 * 1000);
  }
  return followupDate && arvDispensedInDays
    ? resultNextVisitDate
    : null;
};

function CalcTreatmentEndDate(followupDate: Date, arvDispensedInDays: string, followupStatus: string) {
  let dispensedDoseReturned = DispensedDoseInNumber(arvDispensedInDays);
  let resultTreatmentEndDate = {};
  let extraDaysAdded = 30 + dispensedDoseReturned;
  if (followupDate && arvDispensedInDays && followupStatus == '160429AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA') {
    resultTreatmentEndDate = new Date(followupDate.getTime() + extraDaysAdded * 24 * 60 * 60 * 1000);
  }
  return followupDate && arvDispensedInDays && followupStatus == '160429AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    ? resultTreatmentEndDate
    : null;
};

export const CustomControlEthio = ({
  name: "eth-date",
  load: () => import("./controls/date/ethiohri-date.component"),
  type: "eth-date",
});

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
  registerExpressionHelper('CustomNextVisitDateCalc', CalcNextVisitDate);
  registerExpressionHelper('CustomTreatmentEndDateCalc', CalcTreatmentEndDate);

  registerControl(CustomControlEthio);
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
  createDashboardGroup(PMTCT_META),
  options
);
export const maternalHealthMenu = getSyncLifecycle(
  createDashboardLink({
    ...MATERNAL_HEALTH_SUMMARY,
    moduleName,
  }),
  options
);
export const maternalHealthChart = getAsyncLifecycle(
  () => import("./pages/pmtct/maternal-health.component"),
  options
);
export const childHealthMenu = getSyncLifecycle(
  createDashboardLink({
    ...CHILD_HEALTH_SUMMARY,
    moduleName,
  }),
  options
);
export const childHealthChart = getAsyncLifecycle(
  () => import("./pages/child-care/child-care.component"),
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
