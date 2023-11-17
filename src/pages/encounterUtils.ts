import { getObsFromEncounter } from "@ohri/openmrs-esm-ohri-commons-lib";

export function getData(
  encounter: any,
  conceptId: string,
  isDate: boolean = false
) {
  return getObsFromEncounter(encounter, conceptId, isDate);
}
