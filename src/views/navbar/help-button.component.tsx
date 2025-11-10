import React from "react";
import { Switcher } from "@carbon/react";
import { Help } from "@carbon/react/icons";
import styles from "./navbar.scss";

const HelpMenu: React.FC = () => {
  const currentUrl = `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ""
  }/openmrs/spa/EthiOHRI_V1.6_User_Guide.pdf.pdf`;

  return (
    <div className={styles.switcherContainer}>
      <a href={currentUrl} target="_blank" style={{ textDecoration: "none" }}>
        <Switcher aria-label="Help">
          <Help size={20} />
          <p>Help</p>
        </Switcher>
      </a>
    </div>
  );
};

export default HelpMenu;
