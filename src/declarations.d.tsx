declare module "@carbon/react";
declare module "*.css";
declare module "*.scss";
declare module "*.png";

declare type SideNavProps = object;

declare namespace fhir {
  type Bundle = fhir4.Bundle;
  type CodeableConcept = fhir4.CodeableConcept;
  type HumanName = fhir4.HumanName;
  type Identifier = fhir4.Identifier;
  type Patient = fhir4.Patient;
  type ResourceBase = fhir4.Resource;
}
