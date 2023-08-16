import React, { useEffect, useState } from "react";
import { fetchLocation } from "../../api/api";
import styles from "./navbar.scss";

const FacilityName = () => {
  const [facilityLocation, setFacilityLocation] = useState("");

  useEffect(() => {
    (async function () {
      const facilityInformation = await fetchLocation();
      facilityInformation.data.results.forEach((element) => {
        if (element.tags.some((x) => x.display === "Facility Location")) {
          setFacilityLocation(element.display);
        }
      });
    })();
  }, [facilityLocation]);

  return (
    <div className={styles.topNavActionsSlot}>
      <div className={styles.navDivider} />
      <div className={styles.patientDetails}>
        <span className={styles.patientName}>{facilityLocation}</span>
      </div>
    </div>
  );
};

export default FacilityName;
