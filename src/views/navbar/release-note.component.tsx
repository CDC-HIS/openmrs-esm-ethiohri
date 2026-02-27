import React from "react";
import { Switcher } from "@carbon/react";
import { DocumentPdf } from "@carbon/react/icons";
import styles from "./navbar.scss";

const ReleaseNoteMenu: React.FC = () => {
  const currentUrl = `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ""
  }/openmrs/spa/Ethiohri_2.0_Release_Note.pdf`;

  return (
    <div className={styles.switcherContainer}>
      <a href={currentUrl} target="_blank" style={{ textDecoration: "none" }}>
        <Switcher aria-label="Release Note">
          <DocumentPdf size={20} />
          <p>Release Note</p>
        </Switcher>
      </a>
    </div>
  );
};

export default ReleaseNoteMenu;
