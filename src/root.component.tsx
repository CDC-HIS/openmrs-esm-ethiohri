import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeDashboard from "./components/home/home.component";

const Root: React.FC = () => {
  const basename = `${window.getOpenmrsSpaBase()}`;

  return (
    <BrowserRouter basename={basename}>
      {/* <main className={styles.container}> */}
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
      </Routes>
      {/* </main> */}
    </BrowserRouter>
  );
};

export default Root;
