import React from "react";
import { Switcher } from "@carbon/react";
import { Help } from "@carbon/react/icons";
import styles from "./navbar.scss";

const HelpMenu: React.FC = () => {
  const openHelpLink = () => {
    const currentUrl = new URL(window.location.href);
    currentUrl.port = "81";
    currentUrl.pathname = "/doku.php";
    window.open(currentUrl.toString(), "_blank");
  };

  return (
    <div className={styles.switcherContainer} onClick={openHelpLink}>
      <Switcher aria-label="Switcher Container">
        <Help size={20} />
        <p>Help</p>
      </Switcher>
    </div>
  );
};

export default HelpMenu;
