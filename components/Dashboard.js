import React, { useState, useEffect } from 'react';
import {
  Drawer, notification
} from 'antd';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import ContentScreen from './ContentScreen';
import {
  UPDATE_USER_MAP,
} from '../GraphQL/map/query';
import requestWorld from '../request/worlds';
import requestMap from '../request/map';
import MapList from './MapList';
import MapSettings from './MapSettings';
import WorldsList from './WorldsList';
import MapScreens from './MapScreens';
import WorldsSettings from './WorldsSettings';

const Dashboard = (props) => {
  const {
    activeWorld,
    activeTab,
    setActiveWorld,
    setActiveTab,
    setActiveMap,
    activeMap,
  } = props;
  const { GET_WORLDS, CREATE_WORLD, UPDATE_WORLD } = requestWorld;
  const { GET_MAPS, CREATE_MAP } = requestMap;
  const [showModal, setShowModal] = useState(null);
  const [drawerTitle, setDrawerTitle] = useState();
  const [worlds, setWorlds] = useState(null);
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [maps, setMaps] = useState(false);
  const [userId, setUserId] = useState(null);
  const [nameWorld, setNameWorld] = useState(activeWorld?.name ? activeWorld?.name : '');
  const [editName, setEditName] = useState(false);

  useEffect(() => {
    setNameWorld(activeWorld?.name);
  }, [activeWorld]);
  
  const nameHandler = (event) => {
    setNameWorld(event.target.value);
  };

  const findIndexItem = (array, name, id) => array.findIndex((el) => el[name] === id);

  const changeArrayWorlds = (updateWorlds) => {
    const oldArray = [...worlds];
    const findItem = findIndexItem(oldArray, 'id', updateWorlds.id);
    oldArray[findItem] = updateWorlds;
    setWorlds(oldArray)
  };

  const updateWorldHandler = ({ update_Worlds }) => {
    setActiveWorld(update_Worlds?.returning[0]);
    changeArrayWorlds(update_Worlds.returning[0]);
    setPassword('');
    setRetypePassword('');
    setShowModal(null);
    notification.success({
      message: 'Update Success',
    });
  };

  const updateMapHandler = ({ updateMap }) => {
    setActiveMap(updateMap[0]);
    setMaps(updateMap);
    setShowModal(null);
  };
  const getWorldHandler = ({ Worlds }) => setWorlds(Worlds);
  const getMapHandler = ({ Maps }) => setMaps(Maps);
  
  const [fetchMaps] = useLazyQuery(GET_MAPS, {
    onCompleted: (data) => getMapHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on load Maps',
      });
    },
  });

  const [fetchWorlds] = useLazyQuery(GET_WORLDS, {
    onCompleted: (data) => getWorldHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on load Worlds',
      });
    },
  });
  
  const [updateWorld] = useMutation(UPDATE_WORLD, {
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

  const [createWorld] = useMutation(CREATE_WORLD, {
    update(_, { data }) {
      const array = [...worlds];
      array.push(data?.insert_Worlds?.returning[0]);
      setWorlds(array);
    },
  });

  const [createMap] = useMutation(CREATE_MAP, {
    update(_, { data }) {
      const array = [...maps];
      array.push(data?.insert_Maps?.returning[0]);
      setMaps(array);
    },
  });

  useEffect(() => {
    const ownerId = +localStorage.getItem('userId');
    setUserId(ownerId);
    fetchWorlds();
    fetchMaps();
  }, []);
  
  const editTitleHandler = () => {
    if (!editName) {
      setEditName(true);
    } else {
      if (nameWorld) {
        updateWorld({
          variables: {
            _set: {
              name: nameWorld
            },
            where: { id: { _eq: activeWorld.id } } 
          },
        });
      }
      setEditName(false);
    }
  };

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
          activeWorld={activeWorld}
          createWorld={createWorld}
          setShowModal={setShowModal}
          setDrawerTitle={setDrawerTitle}
        />
      )}

      {activeWorld && activeTab === 'settings' && (
        <WorldsSettings
          activeWorld={activeWorld}
          updateWorld={updateWorld}
          setPassword={setPassword}
          setRetypePassword={setRetypePassword}
          password={password}
          retypePassword={retypePassword}
          maps={maps}
          nameHandler={nameHandler}
          nameWorld={nameWorld}
          editTitleHandler={editTitleHandler}
          editName={editName}
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
    mapID: PropTypes.number,
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
