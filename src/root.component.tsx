import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LeftNavMenu, useLeftNav } from '@openmrs/esm-framework';
import Home from './root.component';
import styles from './root.scss';

const Root: React.FC = () => {
  const spaBasePath = window.spaBase;

  useLeftNav({
    name: 'bed-management-left-panel-slot',
    basePath: spaBasePath,
  });

  return (
    <BrowserRouter basename={`${window.getOpenmrsSpaBase()}bed-management`}>
      <LeftNavMenu isChildOfHeader />
      <main className={styles.container}>
        <Routes>
          <Route path="/summary" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default Root;
