import { Tab, Tabs } from "carbon-components-react";
import React from "react";

const VisitSummary: React.FC<{ patientUuid: string }> = ({}) => {
  return (
    <div>
      <Tabs>
        <Tab label="Follow-Up">
          <div>Followup Form coming soon</div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default VisitSummary;
