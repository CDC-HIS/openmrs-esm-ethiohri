import { getObsFromEncounter } from "@ohri/openmrs-esm-ohri-commons-lib";
import { fetchIdentifiers, getPatientEncounters } from "../api/api";

export function getData(
  encounter: any,
  conceptId: string,
  isDate: boolean = false
) {
  return getObsFromEncounter(encounter, conceptId, isDate);
}

export async function doesPatientHaveIdentifier(patientId, setHasIdentifier) {
  const identifiers = await fetchIdentifiers(patientId);
  if (identifiers?.find((e) => e.identifierType.display === "MRN")) {
    setHasIdentifier(true);
  }
}

export async function doesEncounterExist(
  patientId,
  encounterTypeId,
  setHasEncounter
) {
  const previousencounter = await getPatientEncounters(
    patientId,
    encounterTypeId
  );
  if (previousencounter.length) {
    setHasEncounter(true);
  }
}
