import React from "react";
import { Switcher } from "@carbon/react";
import styles from "./navbar.scss";
import { ResetIcon } from "@openmrs/esm-framework";

const ReleaseNoteMenu: React.FC = () => {
  const currentUrl = `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ""
  }/openmrs/spa/Ethiohri_1_5_Release_Note.pdf`;

  return (
    <div className={styles.switcherContainer}>
      <a href={currentUrl} target="_blank" style={{ textDecoration: "none" }}>
        <Switcher aria-label="Release Note">
          <ResetIcon size={20} />
          <p>Release Note</p>
        </Switcher>
      </a>
    </div>
  );
};

export default ReleaseNoteMenu;
