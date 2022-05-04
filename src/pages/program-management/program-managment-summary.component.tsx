import { Tab, Tabs } from "carbon-components-react";
import React from "react";
import IntakeA from "./tabs/intake-a.component";
import IntakeB from "./tabs/intake-b.component";

const ProgramManagment: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <div>
      <Tabs>
        <Tab label="Intake A">
          <IntakeA patientUuid={patientUuid} />
        </Tab>
        <Tab label="Intake B">
          <IntakeB patientUuid={patientUuid} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProgramManagment;
