declare module "@carbon/react";
declare module "*.css";
declare module "*.scss";
declare module "*.png";

declare type SideNavProps = object;

// declare namespace fhir {
//   type Bundle = fhir4.Bundle;
//   type CodeableConcept = fhir4.CodeableConcept;
//   type HumanName = fhir4.HumanName;
//   type Identifier = fhir4.Identifier;
//   type Patient = fhir4.Patient;
//   type ResourceBase = fhir4.Resource;
// }

declare module "@ohri/openmrs-esm-ohri-commons-lib" {
  export const EncounterList: any;
  export const EncounterListColumn: any;
  export const EmptyStateComingSoon: any;
  export const AddPatientToListOverflowMenuItem: any;
  export const FhirPatientResponse: any;
  export const getObsFromEncounter: any;
  export const createConditionalDashboardGroup: any;
  export const createConditionalDashboardLink: any;
  export const launchPatientWorkspace: any;
  export const DashboardGroupExtension: any;
  // catch-all for anything else
  const _default: any;
  export default _default;
}
