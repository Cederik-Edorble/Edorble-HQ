import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { Button, notification } from 'antd';
import DrawerTitle from './DrawerTitle';
import NewRegionForm from './NewRegionForm';
import NewScreenForm from './NewScreenForm';
import request from '../request/contentHolder';
import { filterArray, filterArrayScreen } from '../Utils/helper';

const MapScreens = ({
  setDrawerBody, setDrawerTitle, activeMap, fetchMaps, setActiveMap, maps, screenTypes, fetchContent
}) => {
  const {
    CREATE_REGION, DELETE_REGION, UPDATE_REGION, CREATE_SCREEN, DELETE_SCREEN, UPDATE_SCREEN 
  } = request;
  const [screens, setScreens] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedScreen, setSelectedScreen] = useState();

  useEffect(() => {
    fetchContent();
  }, []);
 
  const regionHandler = () => {
    fetchMaps();
    fetchContent();
    setDrawerBody(null);
    notification.success({
      message: 'Success',
    });
  };

  const [createRegion] = useMutation(CREATE_REGION, {
    onCompleted: () => regionHandler(),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on create region',
      });
    },
  });

  const [deleteRegion] = useMutation(DELETE_REGION, {
    onCompleted: () => regionHandler(),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on delete region',
      });
    },
  });

  const [updateRegion] = useMutation(UPDATE_REGION, {
    onCompleted: () => regionHandler(),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on update region',
      });
    },
  });

  const [createScreen] = useMutation(CREATE_SCREEN, {
    onCompleted: () => regionHandler(),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on create screen',
      });
    },
  });

  const [updateScreen] = useMutation(UPDATE_SCREEN, {
    onCompleted: () => regionHandler(),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on update screen',
      });
    },
  });

  const [deleteScreen] = useMutation(DELETE_SCREEN, {
    onCompleted: () => regionHandler(),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on delete screen',
      });
    },
  });

  useEffect(() => {
    const itemMap = filterArray(maps, 'id', activeMap.id);
    setActiveMap(itemMap[0]);
  }, [maps]);

  useEffect(() => {
    const getScreens = filterArrayScreen(activeMap.MapRegionMappings, selectedRegion?.id);
    if (selectedRegion && getScreens.length > 0) {
      setScreens(getScreens[0]);
    } else {
      setScreens();
    }
  }, [activeMap, selectedRegion]);

  return (
    <>
      <div className="col-span-12 p-2 mb-5 flex justify-center">
        {activeMap
        && activeMap.MapRegionMappings.map((item, index) => (
          <Button
            htmlType="submit"
            key={[item.Region.name, index].join('_')}
            onClick={() => {
              setSelectedScreen(null);
              setSelectedRegion(item.Region);
            }}
            type={
              selectedRegion
                ? selectedRegion.id === item.Region.id && 'primary'
                : 'default'
            }
            size="large"
            className="rounded font-bold mr-2"
          >
            {item.Region.name}
          </Button>
        ))}
        <Button
          htmlType="submit"
          type="primary"
          ghost
          size="large"
          onClick={() => {
            setSelectedRegion(null);
            setDrawerTitle(<DrawerTitle text="New Region" />);
            setDrawerBody(
              <NewRegionForm
                activeMap={activeMap}
                createRegion={createRegion}
              />
            );
          }}
          className="rounded font-bold mr-2"
          icon={<i className="fa fa-plus mr-2" />}
        >
          Add Region
        </Button>
        {selectedRegion && (
          <Button
            htmlType="submit"
            type="primary"
            ghost
            onClick={() => {
              setDrawerTitle(<DrawerTitle text="Edit Region" />);
              setDrawerBody(
                <NewRegionForm
                  activeMap={activeMap}
                  activeRegion={selectedRegion}
                  updateRegion={updateRegion}
                  deleteRegion={deleteRegion}
                />
              );
            }}
            size="large"
            className="rounded font-bold"
            icon={<i className="fa fa-edit cursor-pointer mr-2" />}
          >
            Edit
          </Button>
        )}
      </div>
      
      {selectedRegion && (
        <div className="col-span-12 p-2 mb-5 flex justify-center">
          {screens
          && screens?.Region?.InteractiveContentHolders?.map((screen, index) => (
            <Button
              htmlType="submit"
              key={[screen.id, index].join('_')}
              onClick={() => setSelectedScreen(screen)}
              type={
                selectedScreen
                  ? selectedScreen.id === screen.id && 'primary'
                  : 'default'
              }
              className="rounded font-bold mr-2"
            >
              {`${screen.name}`}
            </Button>
          ))}

          <Button
            htmlType="submit"
            type="primary"
            ghost
            onClick={() => {
              setDrawerTitle(<DrawerTitle text="New Content Holder" />);
              setDrawerBody(
                <NewScreenForm
                  screenTypes={screenTypes}
                  activeRegion={selectedRegion}
                  createScreen={createScreen}
                />
              );
            }}
            className="rounded font-bold  mr-2"
            icon={<i className="fa fa-plus mr-2" />}
          >
            Add Content Holder
          </Button>
          
          {selectedScreen && (
            <Button
              htmlType="submit"
              type="primary"
              ghost
              onClick={() => {
                setDrawerTitle(<DrawerTitle text="Edit Content Holder" />);
                setDrawerBody(
                  <NewScreenForm
                    screenTypes={screenTypes}
                    activeRegion={selectedRegion}
                    activeScreen={selectedScreen}
                    updateScreen={updateScreen}
                    deleteScreen={deleteScreen}
                  />
                );
              }}
              className="rounded font-bold"
              icon={<i className="fa fa-edit cursor-pointer mr-2" />}
            >
              Edit Content Holder 
            </Button>
          )}
        </div>
      )}
    </>
  );
};

MapScreens.propTypes = {
  setDrawerBody: PropTypes.func.isRequired,
  setDrawerTitle: PropTypes.func.isRequired,
  activeMap: PropTypes.shape({
    id: PropTypes.number,
    MapRegionMappings: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  fetchMaps: PropTypes.func,
  setActiveMap: PropTypes.func,
  fetchContent: PropTypes.func,
  maps: PropTypes.arrayOf(PropTypes.shape({})),
  screenTypes: PropTypes.arrayOf(PropTypes.shape({}))
};

MapScreens.defaultProps = {
  activeMap: {},
  fetchMaps: () => {},
  setActiveMap: () => {},
  fetchContent: () => {},
  maps: [],
  screenTypes: [],
};

export default MapScreens;
