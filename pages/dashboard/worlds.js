import React from 'react';
import Navbar from '../../components/Navbar';

import DownloadEdorble from '../../components/DownloadEdorble';
import DashboardNav from '../../components/DashboardNav';
import Dashboard from '../../components/Dashboard';

const Worlds = () => {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-12 gap-4 p-2">
        <DownloadEdorble />
        <div
          className="col-span-12 md:col-span-8 border border-edorble-400 rounded"
        >
          <DashboardNav />
          <div className="p-10">
            <div className="grid grid-cols-12 gap-4">
              <Dashboard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Worlds;
