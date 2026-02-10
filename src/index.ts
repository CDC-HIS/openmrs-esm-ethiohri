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
import { createDashboardLink } from "@openmrs/esm-patient-common-lib";
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
  CalcPrepDoseEndDate,
  CalcMonthsOnART,
  CalcViralLoadStatus,
  customAssessmentDate,
  customPrepStatus,
  customLatestObs,
  CalcAdultNutritionalStatus,
  CalcNutritionalScreening,
  CalcOlderChildNutritionalStatus,
  CalcNextFollowupDateForCxCa,
  CalcBMI,
  getGender,
  getIdentifier,
  calcEGFR,
  isDateAlreadyUsed,
  isSupplementaryFoodVisible,
  isTOVisible,
  isTreatmentVisible,
  loadFollowupStatus,
  CustomLatestObservations,
  getBirthdateFromAge,
  getAgeFromBirthdate,
  getEligibilityStatus,
  calculateAgeFrom,
} from "./custom-expressions";

import { PatientList } from "./components/patient-lists/patient-list.component";

export const moduleName = "@icap-ethiopia/esm-ethiohri-app";
export const options = { featureName: "ethiohri", moduleName };
export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy",
);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
  registerExpressionHelper("CustomNextVisitDateCalc", CalcNextVisitDate);
  registerExpressionHelper("CustomTreatmentEndDateCalc", CalcTreatmentEndDate);
  registerExpressionHelper("CustomPrepDoseEndDateCalc", CalcPrepDoseEndDate);
  registerExpressionHelper("CustomMonthsOnARTCalc", CalcMonthsOnART);
  registerExpressionHelper("CustomViralLoadStatusCalc", CalcViralLoadStatus);
  registerExpressionHelper("customAssessmentDate", customAssessmentDate);
  registerExpressionHelper("customPrepStatus", customPrepStatus);
  registerExpressionHelper("customLatestObs", customLatestObs);
  registerExpressionHelper(
    "CustomAdultNutritionalStatusCalc",
    CalcAdultNutritionalStatus,
  );
  registerExpressionHelper(
    "CustomNutritionalScreeningCalc",
    CalcNutritionalScreening,
  );
  registerExpressionHelper(
    "CustomOlderChildNutritionalStatusCalc",
    CalcOlderChildNutritionalStatus,
  );
  registerExpressionHelper(
    "CustomNextFollowupDateForCxCa",
    CalcNextFollowupDateForCxCa,
  );
  registerExpressionHelper("CustomBMICalc", CalcBMI);
  registerExpressionHelper("getGender", getGender);
  registerExpressionHelper("getIdentifier", getIdentifier);
  registerExpressionHelper("getEligibilityStatus", getEligibilityStatus);
  registerExpressionHelper("calcEGFR", calcEGFR);
  registerExpressionHelper("isDateAlreadyUsed", isDateAlreadyUsed);
  registerExpressionHelper("isTreatmentVisible", isTreatmentVisible);
  registerExpressionHelper(
    "isSupplementaryFoodVisible",
    isSupplementaryFoodVisible,
  );
  registerExpressionHelper("isTOVisible", isTOVisible);
  registerExpressionHelper("loadFollowupStatus", loadFollowupStatus);
  registerExpressionHelper(
    "CustomLatestObservations",
    CustomLatestObservations,
  );
  registerExpressionHelper("getBirthdateFromAge", getBirthdateFromAge);
  registerExpressionHelper("getAgeFromBirthdate", getAgeFromBirthdate);
  // registerControl({
  //   name: "eth-date",
  //   load: () => import("./components/controls/date/ethiohri-date.component"),
  //   type: "eth-date",
  // });
}

export const patientDetailsButton = getAsyncLifecycle(
  () =>
    import("./components/actions-buttons/test-patient-details-button.component"),
  options,
);

export const attributeTags = getAsyncLifecycle(
  () =>
    import("./components/patient-banner-tags/test-attribute-tags.component"),
  {
    featureName: "test-attribute-tags",
    moduleName,
  },
);
// export const hivCareAndTreatmentMenu = getSyncLifecycle(
//   createDashboardGroup(HIV_CARE_AND_TREATMENT),
//   options,
// );
export const facilityName = getAsyncLifecycle(
  () => import("./views/navbar/facility-name.component"),
  options,
);
export const programManagementMenu = getSyncLifecycle(
  createDashboardLink({
    ...PROGRAM_MANAGEMENT_META,
    moduleName,
  }),
  options,
);

export const clinicalVisitsMenu = getSyncLifecycle(
  createDashboardLink({
    ...CLINICAL_VISITS,
    moduleName,
  }),
  options,
);
export const prepMenu = getSyncLifecycle(
  createDashboardLink({
    ...PREP_META,
    moduleName,
  }),
  options,
);

export const patientList = getSyncLifecycle(PatientList, {
  featureName: "home",
  moduleName,
});

export const helpMenu = getAsyncLifecycle(
  () => import("./views/navbar/help-button.component"),
  options,
);

export const releaseNote = getAsyncLifecycle(
  () => import("./views/navbar/release-note.component"),
  options,
);

(window as any).calculateAgeFrom = calculateAgeFrom;
