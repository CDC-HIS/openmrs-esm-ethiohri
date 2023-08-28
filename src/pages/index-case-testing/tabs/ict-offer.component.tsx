/* eslint-disable prettier/prettier */
import React from "react";
import { EmptyStateComingSoon } from "@ohri/openmrs-esm-ohri-commons-lib";

const ICTOffer: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
    const pageTitle = "ICT Offer Summary";

    return (
        <EmptyStateComingSoon displayText={pageTitle} headerTitle={pageTitle} />
    );
};

export default ICTOffer;
