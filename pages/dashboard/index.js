import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import DownloadEdorble from '../../components/DownloadEdorble';
import DashboardNav from '../../components/DashboardNav';
import Dashboard from '../../components/Dashboard';
import constant from '../../constants/routes';
import items from '../../constants/items';
import { getStringStorage } from '../../Utils/storageWorks';

const Index = () => {
  const router = useRouter();
  const [activeWorld, setActiveWorld] = useState(null);
  const [activeTab, setActiveTab] = useState(items.worlds);
  const [activeMap, setActiveMap] = useState(null);

  const redirectHandler = (path) => router.push(`${path}`).then(() => window.scrollTo(0, 0));

  const goMainPage = () => redirectHandler(constant.home);

  const goDashboard = () => redirectHandler(constant.dashboard);

  const logout = async () => {
    localStorage.removeItem(items.token);
    goMainPage();
  };
  
  useEffect(() => {
    if (window) {
      const token = getStringStorage(items.token);
      const userId = getStringStorage(items.userId);
      if (!token || !userId) {
        goMainPage();
      }
    }
  }, []);
  
  return (
    <>
      <Navbar goDashboard={goDashboard} logout={logout} />
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
};

export default Index;
