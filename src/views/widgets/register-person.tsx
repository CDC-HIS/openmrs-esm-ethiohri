import React, { useEffect } from "react";
import { EmptyStateComingSoon } from "@ohri/openmrs-esm-ohri-commons-lib";

const RegisterPerson: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  useEffect(() => {});

  return (
    <a
      target="_blank"
      href="https://ethiohri-dev.globalhealthapp.net/openmrs/admin/person/addPerson.htm?viewType=edit"
    >
      + Register a Person
    </a>
  );
};

export default RegisterPerson;
