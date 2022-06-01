import { Tab, Tabs } from "carbon-components-react";
import React from "react";

const AdherenceSummary: React.FC<{ patientUuid: string }> = ({
  patientUuid,
}) => {
  return (
    <div>
      <Tabs>
        <Tab label="Adherence Counselling Summary">
          <div>Adherence Counselling Summary coming soon</div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdherenceSummary;
