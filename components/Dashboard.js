import React, { useState, useEffect } from 'react';
import {
  Drawer, notification
} from 'antd';
import { useLazyQuery, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import ContentScreen from './ContentScreen';
import {
  GET_USER_WORLDS,
  UPDATE_USER_WORLD,
  CREATE_USER_WORLD,
  DELETE_USER_WORLD,
} from '../GraphQL/world/query';
import {
  CREATE_USER_MAP,
  DELETE_USER_MAP,
  GET_USER_MAP,
  UPDATE_USER_MAP,
} from '../GraphQL/map/query';
import MapList from './MapList';
import MapSettings from './MapSettings';
import WorldsList from './WorldsList';
import MapScreens from './MapScreens';
import WorldsSettings from './WorldsSettings';

const Dashboard = (props) => {
  const [showModal, setShowModal] = useState(null);
  const [drawerTitle, setDrawerTitle] = useState();
  const [worlds, setWorlds] = useState(null);
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [maps, setMaps] = useState(false);

  const createWorldHandler = ({ createWorld }) => {
    setWorlds(createWorld);
    setShowModal(null);
  };
  const updateWorldHandler = ({ updateWorld }) => {
    const { setActiveWorld } = props;
    setActiveWorld(updateWorld[0]);
    setWorlds(updateWorld);
    setPassword('');
    setRetypePassword('');
    setShowModal(null);
    notification.success({
      message: 'Update Success',
    });
  };
  const updateMapHandler = ({ updateMap }) => {
    const { setActiveMap } = props;
    setActiveMap(updateMap[0]);
    setMaps(updateMap);
    setShowModal(null);
  };
  const getWorldHandler = ({ getUserWorld }) => setWorlds(getUserWorld);
  const getMapHandler = ({ getUserMaps }) => setMaps(getUserMaps);
  const createMapHandler = ({ createMap }) => setMaps(createMap);
  const deleteMapHandler = ({ deleteMap }) => {
    const { setActiveMap, setActiveTab } = props;
    setActiveMap(null);
    setMaps(deleteMap);
    setActiveTab('maps');
    setShowModal(null);
  };
  const deleteWorldHandler = ({ deleteWorld }) => {
    const { setActiveWorld, setActiveTab } = props;
    setWorlds(deleteWorld);
    setActiveWorld(null);
    setActiveTab('worlds');
    setShowModal(null);
  };
  const [fetchMaps] = useLazyQuery(GET_USER_MAP, {
    onCompleted: (data) => getMapHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on load Maps',
      });
    },
  });
  const [fetchWorlds] = useLazyQuery(GET_USER_WORLDS, {
    onCompleted: (data) => getWorldHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on load Worlds',
      });
    },
  });
  const [updateWorld] = useMutation(UPDATE_USER_WORLD, {
    onCompleted: (data) => updateWorldHandler(data),
    onError: () => {
      notification.error({
        message: 'Update Error',
        description: 'Error on update World',
      });
    },
  });
  const [updateMap] = useMutation(UPDATE_USER_MAP, {
    onCompleted: (data) => updateMapHandler(data),
    onError: () => {
      notification.error({
        message: 'Update Error',
        description: 'Error on update Map',
      });
    },
  });
  const [createWorld] = useMutation(CREATE_USER_WORLD, {
    onCompleted: (data) => createWorldHandler(data),
    onError: () => {
      notification.error({
        message: 'Create Error',
        description: 'Error on create World',
      });
    },
  });
  const [createMap] = useMutation(CREATE_USER_MAP, {
    onCompleted: (data) => createMapHandler(data),
    onError: () => {
      notification.error({
        message: 'Create Error',
        description: 'Error on create Map',
      });
    },
  });
  const [deleteMap] = useMutation(DELETE_USER_MAP, {
    onCompleted: (data) => deleteMapHandler(data),
    onError: () => {
      notification.error({
        message: 'Delete Error',
        description: 'Error on delete Map',
      });
    },
  });
  const [deleteWorld] = useMutation(DELETE_USER_WORLD, {
    onCompleted: (data) => deleteWorldHandler(data),
    onError: () => {
      notification.error({
        message: 'Delete Error',
        description: 'Error on delete World',
      });
    },
  });

  useEffect(() => {
    const ownerId = +localStorage.getItem('userId');
    fetchWorlds({ variables: { ownerId } });
    fetchMaps({ variables: { user: ownerId } });
  }, []);

  const {
    activeWorld,
    activeTab,
    setActiveWorld,
    setActiveTab,
    setActiveMap,
    activeMap,
  } = props;
  return (
    <>
      <Drawer
        title={drawerTitle}
        placement="right"
        closable
        onClose={() => setShowModal(null)}
        visible={showModal}
      >
        {showModal}
      </Drawer>

      {activeTab === 'worlds' && (
        <WorldsList
          worlds={worlds}
          setActiveWorld={setActiveWorld}
          setActiveTab={setActiveTab}
          fetchWorlds={fetchWorlds}
          activeWorld={activeWorld}
          createWorld={createWorld}
          updateWorld={updateWorld}
          setShowModal={setShowModal}
          setDrawerTitle={setDrawerTitle}
        />
      )}

      {activeWorld && activeTab === 'settings' && (
        <WorldsSettings
          activeWorld={activeWorld}
          fetchWorlds={fetchWorlds}
          createWorld={createWorld}
          updateWorld={updateWorld}
          deleteWorld={deleteWorld}
          setShowModal={setShowModal}
          setDrawerTitle={setDrawerTitle}
          setPassword={setPassword}
          setRetypePassword={setRetypePassword}
          password={password}
          retypePassword={retypePassword}
          maps={maps}
        />
      )}

      {activeWorld && activeTab === 'content' && (
        <div className="grid col-span-12">
          <ContentScreen activeWorld={activeWorld} />
        </div>
      )}

      {activeTab === 'maps' && (
        <MapList
          maps={maps}
          setShowModal={setShowModal}
          setDrawerTitle={setDrawerTitle}
          setActiveMap={setActiveMap}
          createMap={createMap}
          updateMap={updateMap}
          setActiveTab={setActiveTab}
        />
      )}
      {activeMap && activeTab === 'map-settings' && (
        <MapSettings
          activeMap={activeMap}
          updateMap={updateMap}
          deleteMap={deleteMap}
          setDrawerBody={setShowModal}
          setDrawerTitle={setDrawerTitle}
          activeTab={activeTab}
        />
      )}
      {activeMap && activeTab === 'screens' && (
        <MapScreens
          activeMap={activeMap}
          setDrawerBody={setShowModal}
          setDrawerTitle={setDrawerTitle}
        />
      )}
    </>
  );
};

Dashboard.propTypes = {
  activeWorld: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    accessCode: PropTypes.number,
    enablePassword: PropTypes.bool,
    map: PropTypes.number,
  }),
  activeMap: PropTypes.shape({
    id: PropTypes.number,
  }),
  activeTab: PropTypes.string.isRequired,
  setActiveWorld: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  setActiveMap: PropTypes.func.isRequired,
};
Dashboard.defaultProps = {
  activeWorld: null,
  activeMap: null,
};
export default Dashboard;
