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
  isEarlierThanConfirmationDate,
  isDateAlreadyUsed,
} from "./custom-expressions";
import {
  createConditionalDashboardGroup,
  createConditionalDashboardLink,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import ProgramManagment from "./views/program-management/program-managment-summary.component";
import VisitsSummary from "./views/visits/visits-summary.component";
import MotherHealth from "./views/pmtct/mother/pmtct-mother.component";
import PreExposure from "./views/pre-exposure/pre-exposure-summary.component";
import PostExposure from "./views/post-exposure/post-exposure.component";
import HIVTestingService from "./views/hiv-testing-service/hiv-testing-service-summary.component";
import IndexCaseTesting from "./views/index-case-testing/index-case-testing-summary.component";
import ActiveMedications from "./views/medications/active-medications.component";
import VitalsSummary from "./views/vitals/vitals-summary.component";
import HivBaselineSummary from "./views/hiv-baseline/hiv-baseline-summary.component";
import ChildHealth from "./views/pmtct/child/pmtct-child.component";

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
  registerExpressionHelper(
    "isEarlierThanConfirmationDate",
    isEarlierThanConfirmationDate
  );
  registerExpressionHelper("isDateAlreadyUsed", isDateAlreadyUsed);

  registerControl({
    name: "eth-date",
    load: () => import("./components/controls/date/ethiohri-date.component"),
    type: "eth-date",
  });
}

export const patientDetailsButton = getAsyncLifecycle(
  () =>
    import(
      "./components/actions-buttons/test-patient-details-button.component"
    ),
  options
);

export const attributeTags = getAsyncLifecycle(
  () =>
    import("./components/patient-banner-tags/test-attribute-tags.component"),
  {
    featureName: "test-attribute-tags",
    moduleName,
  }
);
export const hivBaseline = getSyncLifecycle(HivBaselineSummary, {
  featureName: "hiv-baseline-summary",
  moduleName,
});
export const ethiohriActiveMedications = getSyncLifecycle(
  ActiveMedications,
  options
);
export const vitalsOverview = getSyncLifecycle(VitalsSummary, options);

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

export const programManagementChart = getSyncLifecycle(
  ProgramManagment,
  options
);
export const clinicalVisitsMenu = getSyncLifecycle(
  createDashboardLink({
    ...CLINICAL_VISITS,
    moduleName,
  }),
  options
);
export const clinicalVisitsChart = getSyncLifecycle(VisitsSummary, options);

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
export const childHealthChart = getSyncLifecycle(ChildHealth, options);
export const motherHealthMenu = getSyncLifecycle(
  createConditionalDashboardLink({
    ...MOTHER_HEALTH_SUMMARY,
    moduleName,
  }),
  options
);
export const motherHealthChart = getSyncLifecycle(MotherHealth, options);
export const prepMenu = getSyncLifecycle(
  createDashboardLink({
    ...PREP_META,
    moduleName,
  }),
  options
);
export const prepChart = getSyncLifecycle(PreExposure, options);
export const pepMenu = getSyncLifecycle(
  createDashboardLink({
    ...POST_META,
    moduleName,
  }),
  options
);
export const pepChart = getSyncLifecycle(PostExposure, options);
export const hivTestingServiceMenu = getSyncLifecycle(
  createDashboardLink({
    ...HIV_TESTING_SERVICE_META,
    moduleName,
  }),
  options
);
export const hivTestingServiceChart = getSyncLifecycle(
  HIVTestingService,
  options
);
export const indexCaseTestingMenu = getSyncLifecycle(
  createDashboardLink({
    ...INDEX_CASE_TESTING_META,
    moduleName,
  }),
  options
);
export const indexCaseTestingChart = getSyncLifecycle(
  IndexCaseTesting,
  options
);
