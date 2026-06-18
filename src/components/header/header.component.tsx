import React from "react";
import { Calendar, Location } from "@carbon/react/icons";
import {
  PatientsPictogram,
  formatDate,
  PageHeader,
  PageHeaderContent,
  useSession,
} from "@openmrs/esm-framework";
import styles from "./header.scss";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  const userSession = useSession();
  const userLocation = userSession?.sessionLocation?.display;

  return (
    <PageHeader className={styles.header}>
      <PageHeaderContent
        illustration={
          <PatientsPictogram className={styles.illustrationPictogram} />
        }
        title={title}
        className={styles.leftJustifiedItems}
      />
      <div className={styles.rightJustifiedItems}>
        <div className={styles.dateAndLocation}>
          <Location size={16} />
          <span className={styles.value}>{userLocation}</span>
          <span className={styles.middot}>&middot;</span>
          <Calendar size={16} />
          <span className={styles.value}>
            {formatDate(new Date(), { mode: "standard" })}
          </span>
        </div>
      </div>
    </PageHeader>
  );
};

export default Header;
