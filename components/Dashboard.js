import React, { useState, useEffect } from 'react';
import {
  Drawer, notification
} from 'antd';
import { useLazyQuery, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import WorldContentConfiguration from './WorldContentConfiguration';
import requestWorld from '../request/worlds';
import requestMap from '../request/map';
import requestContentWorld from '../request/contentsWorld';
import requestMapping from '../request/contentMappings';
import requestWorldConfiguration from '../request/worldParametersConfiguration';
import MapList from './MapList';
import MapSettings from './MapSettings';
import WorldsList from './WorldsList';
import MapScreens from './MapScreens';
import WorldsSettings from './WorldsSettings';
import { findIndexItem, removeItemArray } from '../Utils/helper';
import Contents from './Contents';

const Dashboard = (props) => {
  const {
    activeWorld,
    activeTab,
    setActiveWorld,
    setActiveTab,
    setActiveMap,
    activeMap,
    content,
    setContent,
    contentType,
    screenTypes,
    regions,
    fetchContent,
    fetchContentType,
    getScreenTypes
  } = props;
  const { GET_WORLDS, CREATE_WORLD, UPDATE_WORLD } = requestWorld;
  const {
    GET_MAPS, CREATE_MAP, DELETE_MAP, UPDATE_MAP 
  } = requestMap;
  const {
    CREATE_CONTENT, DELETE_CONTENT, UPDATE_CONTENT
  } = requestContentWorld;

  const {
    CREATE_CONTENT_MAPPINGS, REMOVE_CONTENT_MAPPINGS, UPDATE_CONTENT_MAPPINGS 
  } = requestMapping;
  const { INSERT_PARAMS, UPDATE_WORLD_PARAMS, UPDATE_PARAMS } = requestWorldConfiguration;
  const [showModal, setShowModal] = useState(null);
  const [drawerTitle, setDrawerTitle] = useState();
  const [worlds, setWorlds] = useState(null);
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [maps, setMaps] = useState(false);
  const [userId, setUserId] = useState(null);
  const [nameWorld, setNameWorld] = useState(activeWorld?.name ? activeWorld?.name : '');
  const [editName, setEditName] = useState(false);

  const [idMapActive, setIdMapActive] = useState(null);
  const [idWorldActive, setIdWorldActive] = useState(null);
  
  useEffect(() => {
    setIdMapActive(activeMap?.id);
    setIdWorldActive(activeWorld?.id);
  }, [activeMap, activeWorld]);

  useEffect(() => {
    if (activeWorld) {
      setNameWorld(activeWorld?.name);
    }
  }, [activeWorld, activeMap, activeTab]);
  
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

  const deleteMapHandler = () => {
    const array = [...maps];
    const indexItem = findIndexItem(array, 'id', idMapActive);
    const newArray = removeItemArray(array, indexItem, 1);
    setMaps(newArray);
    setActiveTab('maps');
    setShowModal(null);
    setActiveMap(null);
  };

  // eslint-disable-next-line camelcase
  const deleteContentHandler = ({ delete_Contents }) => {
    const array = [...content];
    const indexItem = findIndexItem(array, 'id', delete_Contents.returning[0].id);
    const newArray = removeItemArray(array, indexItem, 1);
    setContent(newArray);
    notification.success({
      message: 'Delete content Success',
    });
  };

  const getWorldHandler = ({ Worlds }) => setWorlds(Worlds);
  const getMapHandler = ({ Maps }) => setMaps(Maps);

  const [fetchWorlds] = useLazyQuery(GET_WORLDS, {
    onCompleted: (data) => getWorldHandler(data),
    fetchPolicy: 'network-only',
    onError: () => {
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

  const [createWorld] = useMutation(CREATE_WORLD, {
    update(_, { data }) {
      const array = [...worlds];
      array.push(data?.insert_Worlds?.returning[0]);
      setWorlds(array);
      setShowModal(null);
      notification.success({
        message: 'Update World Success',
      });
    },
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on update world',
      });
    }
  });

  const [fetchMaps] = useLazyQuery(GET_MAPS, {
    onCompleted: (data) => getMapHandler(data),
    fetchPolicy: 'network-only',
    onError: () => {
    },
  });

  const [createMap] = useMutation(CREATE_MAP, {
    update(_, { data }) {
      const array = [...maps];
      array.push(data?.insert_Maps?.returning[0]);
      setMaps(array);
      setShowModal(null);
    },
  });

  const [updateMap] = useMutation(UPDATE_MAP, {
    update(_, { data }) {
      const array = [...maps];
      const indexItem = findIndexItem(array, 'id', idMapActive);
      array[indexItem] = data?.update_Maps?.returning[0];
      setMaps(array);
      setActiveMap(data?.update_Maps?.returning[0]);
      setShowModal(null);
      notification.success({
        message: 'Update map Success',
      });
    },
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on update map',
      });
    }
  });

  const [deleteMap] = useMutation(DELETE_MAP, {
    onCompleted: () => deleteMapHandler(),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on delete map',
      });
    },
  });

  const [createContent] = useMutation(CREATE_CONTENT, {
    update(_, { data }) {
      const array = [...content];
      array.push(data?.insert_Contents?.returning[0]);
      setContent(array);
      setShowModal(null);
      notification.success({
        message: 'Create Content Success',
      });
    },
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on create content',
      });
    },
  });

  const [updateContentItem] = useMutation(UPDATE_CONTENT, {
    update(_, { data }) {
      const array = [...content];
      const indexItem = findIndexItem(array, 'id', data?.update_Contents?.returning[0].id);
      array[indexItem] = data?.update_Contents?.returning[0];
      setContent(array);
      setShowModal(null);
      notification.success({
        message: 'Update Content Success',
      });
    },
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on update content',
      });
    },
  });

  const [deleteContent] = useMutation(DELETE_CONTENT, {
    onCompleted: (data) => deleteContentHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on delete content',
      });
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

  useEffect(() => {
    if (worlds) {
      const indexItem = findIndexItem(worlds, 'id', idWorldActive);
      if (indexItem !== -1) {
        setActiveWorld(worlds[indexItem]);
      }
    }
  }, [worlds]);

  // eslint-disable-next-line camelcase
  const mappingHolderHandler = ({ insert_WorldMapInteractiveContentHolderContentMapping }) => {
    const idWorldReturn = insert_WorldMapInteractiveContentHolderContentMapping.returning[0].WorldID;
    setIdWorldActive(idWorldReturn);
    fetchWorlds();
    setShowModal(null);
    notification.success({
      message: 'Add Content Success',
    });
  };

  // eslint-disable-next-line camelcase
  const mappingUpdateHolderHandler = ({ update_WorldMapInteractiveContentHolderContentMapping }) => {
    const idWorldReturn = update_WorldMapInteractiveContentHolderContentMapping.returning[0].WorldID;
    setIdWorldActive(idWorldReturn);
    fetchWorlds();
    setShowModal(null);
    notification.success({
      message: 'Update Content Success',
    });
  };

  // eslint-disable-next-line camelcase
  const mappingDeleteHolderHandler = ({ delete_WorldMapInteractiveContentHolderContentMapping }) => {
    const idWorldReturn = delete_WorldMapInteractiveContentHolderContentMapping.returning[0].WorldID;
    setIdWorldActive(idWorldReturn);
    fetchWorlds();
    setShowModal(null);
    notification.success({
      message: 'Remove Content Success',
    });
  };

  const [addContentMapping] = useMutation(CREATE_CONTENT_MAPPINGS, {
    onCompleted: (data) => mappingHolderHandler(data),
    onError: () => {
      notification.error({
        message: 'Update Error',
        description: 'Error on added content in mapping',
      });
    },
  });

  const [updateContentMapping] = useMutation(UPDATE_CONTENT_MAPPINGS, {
    onCompleted: (data) => mappingUpdateHolderHandler(data),
    onError: () => {
      notification.error({
        message: 'Update Error',
        description: 'Error on update content in mapping, choose another holder or content or create new holder in map',
      });
    },
  });

  const [removeContentMapping] = useMutation(REMOVE_CONTENT_MAPPINGS, {
    onCompleted: (data) => mappingDeleteHolderHandler(data),
    onError: () => {
      notification.error({
        message: 'Update Error',
        description: 'Error on remove content in mapping',
      });
    },
  });

  // eslint-disable-next-line camelcase
  const handlerUpdateConfig = ({ update_Worlds }) => {
    const { id } = update_Worlds.returning[0];
    setIdWorldActive(id);
    fetchWorlds();
    notification.success({
      message: 'Update World`s Configuration  Success',
    });
  };

  const [updateWorldConfig] = useMutation(UPDATE_WORLD_PARAMS, {
    onCompleted: (data) => handlerUpdateConfig(data),
    onError: () => {
      notification.error({
        message: 'Update Error',
        description: 'Error on update config in world',
      });
    },
  });
  
  // eslint-disable-next-line camelcase
  const handlerCreateParam = ({ insert_WorldParametersConfigurations }) => {
    const { id } = insert_WorldParametersConfigurations.returning[0];
    updateWorldConfig({
      variables: {
        _eq: idWorldActive,
        WorldParametersConfigurationID: id,
      }
    });
  };

  const [createParametersConfiguration] = useMutation(INSERT_PARAMS, {
    onCompleted: (data) => handlerCreateParam(data),
    onError: () => {
      notification.error({
        message: 'Update Error',
        description: 'Error on create configuration',
      });
    },
  });

  const handlerUpdateParams = () => {
    fetchWorlds();
    notification.success({
      message: 'Update World`s Configuration  Success',
    });
  };

  const [updateParametersConfiguration] = useMutation(UPDATE_PARAMS, {
    onCompleted: () => handlerUpdateParams(),
    onError: () => {
      notification.error({
        message: 'Update Error',
        description: 'Error on update configuration',
      });
    },
  });

  useEffect(() => {
    const params = activeWorld?.WorldParametersConfiguration;
    if (params) {
      setPassword(params.PasswordHash);
      setRetypePassword(params.PasswordHash);
    }
  }, [activeWorld]);
 
  useEffect(() => {
    const ownerId = +localStorage.getItem('userId');
    setUserId(ownerId);
    fetchWorlds();
    fetchMaps();
  }, [activeWorld, activeMap, activeTab]);

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
          updateParametersConfiguration={updateParametersConfiguration}
          createParametersConfiguration={createParametersConfiguration}
        />
      )}

      {activeWorld && activeTab === 'World Content Configuration' && (
        <div className="grid col-span-12">
          <WorldContentConfiguration
            activeWorld={activeWorld}
            setDrawerBody={setShowModal}
            setDrawerTitle={setDrawerTitle}
            regions={regions}
            content={content}
            addContentMapping={addContentMapping}
            removeContentMapping={removeContentMapping}
            updateContentMapping={updateContentMapping}
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
          deleteMap={deleteMap}
          setIdMapActive={setIdMapActive}
          updateMap={updateMap}
        />
      )}
      {activeMap && activeTab === 'Interactive Content Holder' && (
        <MapScreens
          activeMap={activeMap}
          setDrawerBody={setShowModal}
          setDrawerTitle={setDrawerTitle}
          fetchMaps={fetchMaps}
          setActiveMap={setActiveMap}
          maps={maps}
          screenTypes={screenTypes}
          fetchContent={fetchContent}
          fetchWorlds={fetchWorlds}
          getScreenTypes={getScreenTypes}
        />
      )}

      {activeTab === 'contents' && (
      <Contents
        content={content}
        setDrawerTitle={setDrawerTitle}
        setShowModal={setShowModal}
        createContent={createContent}
        contentType={contentType}
        deleteContent={deleteContent}
        updateContentItem={updateContentItem}
        fetchContent={fetchContent}
        fetchContentType={fetchContentType}
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
    WorldParametersConfiguration: PropTypes.shape({}),
    WorldMapInteractiveContentHolderContentMappings: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  activeMap: PropTypes.shape({
    id: PropTypes.number,
  }),
  activeTab: PropTypes.string.isRequired,
  setActiveWorld: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  setActiveMap: PropTypes.func.isRequired,
  content: PropTypes.arrayOf(PropTypes.shape({})),
  setContent: PropTypes.func,
  contentType: PropTypes.arrayOf(PropTypes.shape({})),
  screenTypes: PropTypes.arrayOf(PropTypes.shape({})),
  regions: PropTypes.arrayOf(PropTypes.shape({})),
  fetchContent: PropTypes.func,
  fetchContentType: PropTypes.func,
  getScreenTypes: PropTypes.func,
};
Dashboard.defaultProps = {
  activeWorld: null,
  activeMap: null,
  content: [],
  setContent: () => {},
  contentType: [],
  screenTypes: [],
  regions: [],
  fetchContent: () => {},
  fetchContentType: () => {},
  getScreenTypes: () => {},
};
export default Dashboard;
