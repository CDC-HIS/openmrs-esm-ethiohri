import React from "react";
import Header from "../header/header.component";
import { PatientList } from "../patient-lists/patient-list.component";
import styles from "./home.scss";
import TransferOutDashboard from "../transfer-out/dashbord-tabel";

const HomeDashboard: React.FC = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <Header title="Home" />
      <div className={styles.tableContainer}>
        <TransferOutDashboard />
        <PatientList />
      </div>
    </div>
  );
};

export default HomeDashboard;
