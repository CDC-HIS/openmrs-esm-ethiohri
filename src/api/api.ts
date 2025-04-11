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
  if (conceptUuid === "9ed5856a-a20a-44d2-bc8e-2acaa68cf11b") {
    params += "&_sort=-_lastUpdated&_count=2";
  } else {
    params += "&_sort=-_lastUpdated&_count=1";
  }

  return openmrsFetch(`${fhirBaseUrl}/Observation?${params}`).then(
    ({ data }) => {
      if (data.entry?.length) {
        const latestObs = data.entry[0].resource;

        // Handle multi-select for checkbox fields (e.g., Eligibility status)
        if (conceptUuid === "9ed5856a-a20a-44d2-bc8e-2acaa68cf11b") {
          // Map over the coding array to get the codes
          const selectedCodes = latestObs.valueCodeableConcept?.coding?.map(
            (coding) => coding.code
          );

          // Define the available options for eligibility status
          const eligibilityOptions = [
            {
              concept: "78dc1be4-4668-4170-b994-fc5e9a697e56",
              label: "Eligible",
            },
            {
              concept: "ebd88a37-1187-4e56-8d63-2f505c6833b0",
              label: "Eligible and ready",
            },
          ];

          // Map the selected codes to their corresponding labels
          const selectedLabels = eligibilityOptions
            .filter((option) => selectedCodes?.includes(option.concept))
            .map((option) => option.label);

          return selectedLabels; // This will return the labels of selected options for checkbox
        }

        return latestObs;
      }

      return null;
    }
  );
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
