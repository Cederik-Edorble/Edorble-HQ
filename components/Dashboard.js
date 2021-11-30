import React, { useState, useEffect } from 'react';
import {
  Drawer, notification
} from 'antd';
import { useLazyQuery, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import ContentScreen from './ContentScreen';
import requestWorld from '../request/worlds';
import requestMap from '../request/map';
import requestContentWorld from '../request/contentsWorld';
import MapList from './MapList';
import MapSettings from './MapSettings';
import WorldsList from './WorldsList';
import MapScreens from './MapScreens';
import WorldsSettings from './WorldsSettings';
import {
  findIndexItem, removeItemArray, checkId 
} from '../Utils/helper';

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
  const {
    GET_CONTENTS, INSERT_CONTENT, DELETE_CONTENT, UPDATE_CONTENT 
  } = requestContentWorld;
  const [showModal, setShowModal] = useState(null);
  const [drawerTitle, setDrawerTitle] = useState();
  const [worlds, setWorlds] = useState(null);
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [maps, setMaps] = useState(false);
  const [userId, setUserId] = useState(null);
  const [nameWorld, setNameWorld] = useState(activeWorld?.name ? activeWorld?.name : '');
  const [editName, setEditName] = useState(false);

  const [contentWorld, setContentWorld] = useState(false);
  const [selectedContents, setSelectedContent] = useState([]);
  const [activeContent, setActiveContent] = useState(null);

  useEffect(() => {
    if (activeWorld) {
      setSelectedContent(activeWorld.WorldMapInteractiveContentHolderContentMappings);
    }
  }, [activeWorld]);

  useEffect(() => {
    setNameWorld(activeWorld?.name);
  }, [activeWorld]);
  
  const nameHandler = (event) => {
    setNameWorld(event.target.value);
  };

  const changeArrayWorlds = (updateWorlds) => {
    const oldArray = [...worlds];
    const findItem = findIndexItem(oldArray, 'id', updateWorlds.id);
    oldArray[findItem] = updateWorlds;
    setWorlds(oldArray);
  };

  // eslint-disable-next-line camelcase
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

  // don`t remove, it need for update maps
  const updateMapHandler = ({ updateMap }) => {
    setActiveMap(updateMap[0]);
    setMaps(updateMap);
    setShowModal(null);
  };

  const getWorldHandler = ({ Worlds }) => setWorlds(Worlds);
  const getMapHandler = ({ Maps }) => setMaps(Maps);
  const getContentHandler = ({ Contents }) => {
    setContentWorld(Contents); 
  };
  
  const [fetchMaps] = useLazyQuery(GET_MAPS, {
    onCompleted: (data) => getMapHandler(data),
    fetchPolicy: 'network-only',
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on load Maps',
      });
    },
  });

  const [fetchWorlds] = useLazyQuery(GET_WORLDS, {
    onCompleted: (data) => getWorldHandler(data),
    fetchPolicy: 'network-only',
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

  const [fetchContent] = useLazyQuery(GET_CONTENTS, {
    onCompleted: (data) => getContentHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on load contents',
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

  const [insertContent] = useMutation(INSERT_CONTENT, {
    update(_, { data }) {
      const body = data.insert_WorldMapInteractiveContentHolderContentMapping.returning[0];
      const prevArray = [...selectedContents];
      prevArray.push(body);
      setSelectedContent(prevArray);
      notification.success({
        message: 'Add Content Success',
      });
    },
  });

  // eslint-disable-next-line camelcase
  const updateContentHandler = ({ update_WorldMapInteractiveContentHolderContentMapping }) => {
    const updatedItem = update_WorldMapInteractiveContentHolderContentMapping.returning[0];
    const prevArray = [...selectedContents];
    prevArray[activeContent] = updatedItem;
    setSelectedContent(prevArray);
    notification.success({
      message: 'Update Content Success',
    });
  };

  const [updateContent] = useMutation(UPDATE_CONTENT, {
    onCompleted: (data) => updateContentHandler(data),
    onError: () => {
      notification.error({
        message: 'Update Error',
        description: 'Error on update World',
      });
    },
  });

  const contentHandler = (event, id) => {
    setActiveContent(id);
    updateContent({
      variables: {
        _eq: selectedContents[id].InteractiveContentHolderID, // InteractiveContentHolderID
        _eq1: activeWorld.id, // WorldID
        ContentID: event.target.value // setContent
      }
    });
  };

  const deleteContentHandler = () => {
    notification.success({
      message: 'Delete Content',
    });
  };

  const [deleteContent] = useMutation(DELETE_CONTENT, {
    onCompleted: () => deleteContentHandler(),
    onError: () => {
      notification.error({
        message: 'Update Error',
        description: 'Error on update World',
      });
    },
  });
  
  const addItemContent = () => {
    const id = checkId(selectedContents);
    insertContent({
      variables: {
        WorldID: activeWorld.id,
        MapID: activeWorld.mapID,
        InteractiveContentHolderID: id,
        ContentID: contentWorld[0].id,
      }
    });
  };

  const removeContent = (id) => {
    deleteContent({
      variables: {
        _eq: activeWorld.id,
        _eq1: selectedContents[id].InteractiveContentHolderID
      }
    });
    const newArray = removeItemArray(selectedContents, id, 1);
    setSelectedContent(newArray);
  };
 
  useEffect(() => {
    const ownerId = +localStorage.getItem('userId');
    setUserId(ownerId);
    fetchWorlds();
    fetchMaps();
    fetchContent();
  }, [activeWorld, selectedContents]);

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
          contentWorld={contentWorld}
          addContent={addItemContent}
          selectedContents={selectedContents}
          contentHandler={contentHandler}
          removeContent={removeContent}
        />
      )}

      {activeWorld && activeTab === 'content' && (
        <div className="grid col-span-12">
          <ContentScreen
            activeWorld={activeWorld}
            contentWorld={contentWorld}
            addContent={addItemContent}
            selectedContents={selectedContents}
            contentHandler={contentHandler}
            removeContent={removeContent}
            maps={maps}
            updateWorld={updateWorld}
          />
        </div>
      )}

      {activeTab === 'maps' && (
        <MapList
          maps={maps}
          setShowModal={setShowModal}
          setDrawerTitle={setDrawerTitle}
          setActiveMap={setActiveMap}
          createMap={createMap}
          setActiveTab={setActiveTab}
        />
      )}
      {activeMap && activeTab === 'map-settings' && (
        <MapSettings
          activeMap={activeMap}
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
    WorldMapInteractiveContentHolderContentMappings: PropTypes.arrayOf(PropTypes.shape({}))
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
