/* eslint-disable prettier/prettier */
import React from "react";
import { EmptyStateComingSoon } from "@ohri/openmrs-esm-ohri-commons-lib";

const ICTGeneral: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  const pageTitle = "ICT General Summary";

  return (
    <EmptyStateComingSoon displayText={pageTitle} headerTitle={pageTitle} />
  );
};

export default ICTGeneral;
