import React from "react";
import { Switcher } from "@carbon/react";
import styles from "./navbar.scss";
import { CheckmarkOutlineIcon } from "@openmrs/esm-framework";

const HelpMenu: React.FC = () => {
  const currentUrl = `${window.location.protocol}//${window.location.hostname}:81/doku.php?id=start`;

  return (
    <div className={styles.switcherContainer}>
      <a href={currentUrl} target="_blank" style={{ textDecoration: "none" }}>
        <Switcher aria-label="Help">
          <CheckmarkOutlineIcon size={20} />
          <p>Help</p>
        </Switcher>
      </a>
    </div>
  );
};

export default HelpMenu;
