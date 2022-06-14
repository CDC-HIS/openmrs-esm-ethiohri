import { Tab, Tabs } from "carbon-components-react";
import React from "react";
import FollowupEncounterList from "./tabs/followup.component";

const VisitsSummary: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <div>
      <Tabs type="container">
        <Tab label="Follow-Up">
          <FollowupEncounterList patientUuid={patientUuid} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default VisitsSummary;
