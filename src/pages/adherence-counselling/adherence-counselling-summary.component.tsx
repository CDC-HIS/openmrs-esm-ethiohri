import { Tab, Tabs } from "@carbon/react";
import React from "react";

const AdherenceSummary: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <div>
      <Tabs type="container">
        <Tab label="Adherence Counselling Summary">
          <div>Adherence Counselling Summary coming soon</div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdherenceSummary;
