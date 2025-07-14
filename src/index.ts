/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAsyncLifecycle, getSyncLifecycle } from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import {
  registerControl,
  registerExpressionHelper,
} from "@openmrs/esm-form-engine-lib";
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
} from "./custom-expressions";
import ActiveMedications from "./views/medications/active-medications.component";
import VitalsSummary from "./views/vitals/vitals-summary.component";
import HivBaselineSummary from "./views/hiv-baseline/hiv-baseline-summary.component";
import { PatientList } from "./components/patient-lists/patient-list.component";
import { getValidPatientFollowUpDate } from "./api/api";

export const moduleName = "@icap-ethiopia/esm-ethiohri-app";
export const options = { featureName: "ethiohri", moduleName };
export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

export function startupApp() {
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
    CalcAdultNutritionalStatus
  );
  registerExpressionHelper(
    "CustomNutritionalScreeningCalc",
    CalcNutritionalScreening
  );
  registerExpressionHelper(
    "CustomOlderChildNutritionalStatusCalc",
    CalcOlderChildNutritionalStatus
  );
  registerExpressionHelper(
    "CustomNextFollowupDateForCxCa",
    CalcNextFollowupDateForCxCa
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
    isSupplementaryFoodVisible
  );
  registerExpressionHelper("isTOVisible", isTOVisible);
  registerExpressionHelper("loadFollowupStatus", loadFollowupStatus);
  registerExpressionHelper(
    "CustomLatestObservations",
    CustomLatestObservations
  );
  registerExpressionHelper("getBirthdateFromAge", getBirthdateFromAge);
  registerExpressionHelper("getAgeFromBirthdate", getAgeFromBirthdate);
  registerExpressionHelper(
    "getValidPatientFollowUpDate",
    getValidPatientFollowUpDate
  );
  // registerControl({
  //   name: "eth-date",
  //   load: () => import("./components/controls/date/ethiohri-date.component"),
  //   type: "eth-date",
  // });
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

export const facilityName = getAsyncLifecycle(
  () => import("./views/navbar/facility-name.component"),
  options
);

export const patientList = getSyncLifecycle(PatientList, {
  featureName: "home",
  moduleName,
});

export const helpMenu = getAsyncLifecycle(
  () => import("./views/navbar/help-button.component"),
  options
);

export const releaseNote = getAsyncLifecycle(
  () => import("./views/navbar/release-note.component"),
  options
);
