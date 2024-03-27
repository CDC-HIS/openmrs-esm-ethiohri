import { Tab, Tabs } from "@carbon/react";
import React from "react";

const HtsOverview: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <div>
      <Tabs type="container">
        <Tab label="HIV Testing Service">
          <div>HIV Testing Service Coming Soon</div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default HtsOverview;
