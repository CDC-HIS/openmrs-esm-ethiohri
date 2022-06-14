import { Tab, Tabs } from "carbon-components-react";
import React from "react";
import FollowupEncounterList from "./follow-up/followup.component";

const VisitSummary: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <div>
      <Tabs>
        <Tab label="Follow-Up">
          <FollowupEncounterList patientUuid={patientUuid} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default VisitSummary;
