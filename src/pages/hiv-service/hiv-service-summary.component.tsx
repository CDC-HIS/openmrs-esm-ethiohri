import { Tab, Tabs } from "@carbon/react";
import React from "react";

const ServiceSummary: React.FC<{ patientUuid: string }> = ({ patientUuid }) => {
  return (
    <div>
      <Tabs type="container">
        <Tab label="Service Summary">
          <div>Service Summary Coming Soon</div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ServiceSummary;
