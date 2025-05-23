import { fhirBaseUrl, openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";
import { encounterRepresentation } from "../constants";

export function getPatientEncounters(patientUUID, encounterUUID) {
  return openmrsFetch(
    `${restBaseUrl}/encounter?encounterType=${encounterUUID}&patient=${patientUUID}`
  ).then(({ data }) => {
    return data.results;
  });
}

export function fetchIdentifiers(patientUUID) {
  return openmrsFetch(`${restBaseUrl}/patient/${patientUUID}/identifier`).then(
    ({ data }) => {
      return data.results;
    }
  );
}

export function fetchLocation() {
  return openmrsFetch(`${restBaseUrl}/location?v=default`);
}

// TODO: The WS/REST Encounter resource doesn't support sorting, figure out a better approach ie. FHIR or Reporting
//       This implementation has issues, the WS/REST returns paginated results, and what this function does is get the
//       last item in the payload(paginated results). This doesn't gurrantee that it's the most recent encounter.
//       We should think of a better approach
export function fetchPatientLastEncounter(patientUuid: string, encounterType) {
  const query = `encounterType=${encounterType}&patient=${patientUuid}`;
  return openmrsFetch(
    `${restBaseUrl}/encounter?${query}&v=${encounterRepresentation}`
  ).then(({ data }) => {
    if (data.results.length) {
      return data.results[data.results.length - 1];
    }

    return null;
  });
}

export function getLatestObs(
  patientUuid: string,
  conceptUuid: string,
  encounterTypeUuid?: string
) {
  let params = `patient=${patientUuid}&code=${conceptUuid}${
    encounterTypeUuid ? `&encounter.type=${encounterTypeUuid}` : ""
  }`;
  // the latest obs
  params += "&_sort=-_lastUpdated&_count=1";
  return openmrsFetch(`${fhirBaseUrl}/Observation?${params}`).then(
    ({ data }) => {
      return data.entry?.length ? data.entry[0].resource : null;
    }
  );
}

export async function getEncounterWithLatestFollowUpDate(
  patientUuid: string
): Promise<string | null> {
  const conceptUuid = "5c118396-52dc-4cac-8860-e6d8e4a7f296"; // follow-up date concept
  const response = await openmrsFetch(
    `${fhirBaseUrl}/Observation?patient=${patientUuid}&code=${conceptUuid}&_sort=-date&_count=1`
  );

  const latestFollowupObs = response?.data?.entry?.[0]?.resource;
  return latestFollowupObs?.encounter?.reference?.split("/")[1] || null;
}

export async function getLatestEligibilityFromLatestFollowup(
  patientUuid: string
): Promise<string[]> {
  const latestEncounterUuid = await getEncounterWithLatestFollowUpDate(
    patientUuid
  );

  if (!latestEncounterUuid) return [];

  const conceptUuid = "9ed5856a-a20a-44d2-bc8e-2acaa68cf11b"; // Eligibility status

  const response = await openmrsFetch(
    `${fhirBaseUrl}/Observation?patient=${patientUuid}&code=${conceptUuid}&encounter=${latestEncounterUuid}`
  );

  const entries = response?.data?.entry ?? [];

  const selectedCodes: string[] = entries.flatMap((entry) => {
    const coding = entry.resource.valueCodeableConcept?.coding ?? [];
    return coding.map((c) => c.code);
  });

  return selectedCodes;
}

export async function getLatestObservation(
  patientUuid: string
): Promise<string[]> {
  const latestEncounterUuid = await getEncounterWithLatestFollowUpDate(
    patientUuid
  );

  if (!latestEncounterUuid) return [];

  const conceptUuid = "7d175fa9-e64c-4923-ae6d-e35512be07a3"; // Observation

  const response = await openmrsFetch(
    `${fhirBaseUrl}/Observation?patient=${patientUuid}&code=${conceptUuid}&encounter=${latestEncounterUuid}`
  );

  const entries = response?.data?.entry ?? [];
  const selectedCodes: string[] = entries.flatMap((entry) => {
    const coding = entry.resource.valueCodeableConcept?.coding ?? [];
    return coding.map((c) => c.code);
  });

  // const allowedCodes = [
  //   "98ed68a9-9596-45dc-8015-2289a969c6fe", // CPT and FPT
  //   "98b00c1a-d81c-4648-be6f-86793d0ae23f", // DSD
  //   "773f6394-47ca-4bfc-bd29-ebfdafc9916d", // HIV Prevention Plan - OTZ
  //   "d7098e8d-601f-472c-8914-0632930818a8", // Nutrition - Height
  //   "53b2f5a8-0478-44c9-9507-d397b174be7f", // Pregnancy and FP - Preg.=Yes or BF=Yes
  //   "246831e5-65e8-411f-aac9-57adcc4fb12c"  // TB
  // ];

  // const selectedCodes: string[] = entries.flatMap((entry) => {
  //   const coding = entry.resource.valueCodeableConcept?.coding ?? [];
  //   return coding
  //     .map((c) => c.code)
  //     .filter((code) => allowedCodes.includes(code));
  // });
  
  return selectedCodes;
}

export function getCurrentUser() {
  return openmrsFetch(`ws/rest/v1/session`).then(({ data }) => {
    return data.user ? data.user : null;
  });
}

export async function getRelationships(patientUuid: string) {
  try {
    const response = await openmrsFetch(
      `${restBaseUrl}/relationship?v=full&person=${patientUuid}`
    );
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Error fetching patient emergency contact:", error);
    return null;
  }
}

export async function getPatientInfo(patientUuid: string) {
  try {
    const response = await openmrsFetch(
      `${restBaseUrl}/person/${patientUuid}?v=full`
    );
    const data = await response.data;

    return data;
  } catch (error) {
    console.error("Error fetching patient emergency contact:", error);
    return null;
  }
}
