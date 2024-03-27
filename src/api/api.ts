import { fhirBaseUrl, openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";
import { encounterRepresentation } from "../constants";

export function getPatientEncounters(patientUUID, encounterUUID) {
  return openmrsFetch(
    `${restBaseUrl}encounter?encounterType=${encounterUUID}&patient=${patientUUID}`
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
  return openmrsFetch(`${restBaseUrl}/location?q=&v=default`);
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

export function getCurrentUser() {
  return openmrsFetch(`ws/rest/v1/session`).then(({ data }) => {
    return data.user ? data.user : null;
  });
}
