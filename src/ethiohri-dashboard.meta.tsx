export const HIV_CARE_AND_TREATMENT = {
  title: "HIV Care and Treatment",
  slotName: "hiv-care-and-treatment-slot",
};

export const PMTCT_META = {
  title: "PMTCT",
  slotName: "ethio-pmtct-slot",
  patientExpression:
    "calculateAge(patient.birthDate) <= 3 || patient.gender === 'female'",
};

export const CHILD_HEALTH_SUMMARY = {
  title: "Child Health Summary",
  slot: "child-health-slot",
  path: "child-health",
  patientExpression: "calculateAge(patient.birthDate) <= 3",
};

export const MOTHER_HEALTH_SUMMARY = {
  title: "Mother Health Summary",
  slot: "mother-health-slot",
  path: "mother-health",
  patientExpression: "patient.gender === 'female'",
};

export const PREP_META = {
  title: "PrEP Prophylaxis",
  slot: "prep-slot",
  path: "prep-prophylaxis",
};

export const POST_META = {
  title: "PEP Prophylaxis",
  slot: "post-exposure-slot",
  path: "pep-prophylaxis",
  columns: 1,
};

export const HIV_TESTING_SERVICE_META = {
  title: "HIV Testing Service",
  slot: "hiv-testing-service-slot",
  path: "hiv-testing-service",
};

export const INDEX_CASE_TESTING_META = {
  title: "Index Case Testing",
  slot: "index-case-testing-slot",
  path: "index-case-testing",
};

export const PROGRAM_MANAGEMENT_META = {
  title: "Intake",
  slot: "program-management-slot",
  path: "program-management",
};

export const CLINICAL_VISITS = {
  title: "Clinical Visits",
  slot: "clinical-visits-slot",
  path: "clinical-visits",
};
