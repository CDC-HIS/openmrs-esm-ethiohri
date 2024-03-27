import React from "react";
import { EmptyStateComingSoon } from "@ohri/openmrs-esm-ohri-commons-lib";

const HivPatientSummary: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  const pageTitle = "HIV Patient Summary";

  return (
    <EmptyStateComingSoon displayText={pageTitle} headerTitle={pageTitle} />
  );
};

export default HivPatientSummary;
