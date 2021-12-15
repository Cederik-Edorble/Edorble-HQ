import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery, useQuery } from '@apollo/client';
import { notification } from 'antd';
import Navbar from '../../components/Navbar';
import DownloadEdorble from '../../components/DownloadEdorble';
import DashboardNav from '../../components/DashboardNav';
import Dashboard from '../../components/Dashboard';
import constant from '../../constants/routes';
import items from '../../constants/items';
import requestContentWorld from '../../request/contentsWorld';
import requestResources from '../../request/resourses';
import requestHolder from '../../request/contentHolder';
import requestMapping from '../../request/contentMappings';
import { getStringStorage } from '../../Utils/storageWorks';

const Index = () => {
  const router = useRouter();
  const { GET_REGIONS_HOLDERS } = requestMapping;
  const { GET_SCREEN_TYPES } = requestHolder;
  const { GET_RESOURCES } = requestResources;
  const { GET_CONTENTS, GET_CONTENT_TYPE } = requestContentWorld;
  const [activeWorld, setActiveWorld] = useState(null);
  const [activeTab, setActiveTab] = useState(items.worlds);
  const [activeMap, setActiveMap] = useState(null);

  const [content, setContent] = useState([]);
  const [contentType, setContentType] = useState(false);
  const [resources, setResources] = useState(false);
  const [screenTypes, setScreenTypes] = useState([]);
  const [regions, setRegions] = useState([]);

  const handlerHolder = ({ InteractiveContentHolderTypes }) => {
    setScreenTypes(InteractiveContentHolderTypes);
  };

  const handlerRegions = ({ Regions }) => {
    setRegions(Regions);
  };

  const getResourcesHandler = ({ Resources }) => {
    setResources(Resources); 
  };

  const getContentTypeHandler = ({ ContentTypes }) => {
    setContentType(ContentTypes); 
  };

  const [fetchResources] = useLazyQuery(GET_RESOURCES, {
    onCompleted: (data) => getResourcesHandler(data),
    fetchPolicy: 'network-only',
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on load resources',
      });
    },
  });

  const getContentHandler = ({ Contents: contents }) => {
    setContent(contents); 
  };

  const [fetchContent] = useLazyQuery(GET_CONTENTS, {
    onCompleted: (data) => getContentHandler(data),
    fetchPolicy: 'network-only',
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on load contents',
      });
    },
  });

  const [fetchContentType] = useLazyQuery(GET_CONTENT_TYPE, {
    onCompleted: (data) => getContentTypeHandler(data),
    fetchPolicy: 'network-only',
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on load content type',
      });
    },
  });

  const [getScreenTypes] = useLazyQuery(GET_SCREEN_TYPES, {
    onCompleted: (data) => {
      handlerHolder(data); 
    },
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on getting screens types',
      });
    },
  });

  const [getRegions] = useLazyQuery(GET_REGIONS_HOLDERS, {
    onCompleted: (data) => handlerRegions(data),
    fetchPolicy: 'network-only',
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on getting regions',
      });
    },
  });

  const regionQuery = useQuery(GET_REGIONS_HOLDERS, {
    variables: {
      _eq: activeWorld?.mapID
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (regionQuery?.data) {
      handlerRegions(regionQuery.data);
    }
  }, [regionQuery]);

  useEffect(() => {
    regionQuery.refetch({
      variables: {
        _eq: activeWorld?.mapID
      },
    });
  }, [activeWorld]);

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

  useEffect(() => {
    getScreenTypes();
  }, [activeMap]);

  useEffect(() => {
    if (activeWorld) {
      getRegions({
        variables: {
          _eq: activeWorld.mapID
        }
      });
    }
  }, [activeWorld, activeMap, activeTab]);
 
  useEffect(() => {
    fetchContent();
    fetchContentType();
    fetchResources();
  }, [activeWorld, activeMap]);
  
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
                content={content}
                setContent={setContent}
                contentType={contentType}
                setContentType={setContentType}
                resources={resources}
                setResources={setResources}
                screenTypes={screenTypes}
                setScreenTypes={setScreenTypes}
                regions={regions}
                setRegions={setRegions}
                fetchContent={fetchContent}
                fetchContentType={fetchContentType}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
