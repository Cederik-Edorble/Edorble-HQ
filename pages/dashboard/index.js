import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';

import DownloadEdorble from '../../components/DownloadEdorble';
import DashboardNav from '../../components/DashboardNav';
import Dashboard from '../../components/Dashboard';

function Index() {
  useEffect(() => {
    if (window) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (!token || !userId) {
        window.location.href = '/';
      }
    }
  }, []);
  const [activeWorld, setActiveWorld] = useState(null);
  const [activeTab, setActiveTab] = useState('worlds');
  const [activeMap, setActiveMap] = useState(null);
  return (
    <>
      <Navbar />
      <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="grid grid-cols-12 gap-4 p-2">
        <DownloadEdorble />
        <div className="col-span-12 md:col-span-8 border border-edorble-400 rounded">
          <DashboardNav
            activeWorld={activeWorld}
            activeTab={activeTab}
            activeMap={activeMap}
            setActiveTab={setActiveTab}
            setActiveWorld={setActiveWorld}
            setActiveMap={setActiveMap}
          />
          <div className="p-10">
            <div className="grid grid-cols-12 gap-4">
              <Dashboard
                setActiveWorld={setActiveWorld}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                activeWorld={activeWorld}
                setActiveMap={setActiveMap}
                activeMap={activeMap}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
