import React, { useEffect } from "react";

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
