import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, notification } from 'antd';
import {
  CREATE_MAP_REGION, DELETE_MAP_REGION, GET_MAP_REGIONS, UPDATE_MAP_REGION
} from '../GraphQL/region/query';
import {
  CREATE_REGION_SCREEN, DELETE_REGION_SCREEN,
  GET_REGIONS_SCREEN, UPDATE_REGION_SCREEN,
} from '../GraphQL/screen/query';
import DrawerTitle from './DrawerTitle';
import NewRegionForm from './NewRegionForm';
import NewScreenForm from './NewScreenForm';

const MapScreens = ({ setDrawerBody, setDrawerTitle, activeMap }) => {
  const [regions, setRegions] = useState();
  const [screens, setScreens] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedScreen, setSelectedScreen] = useState();
  const getRegionsHandler = ({ getMapRegion }) => setRegions(getMapRegion);
  const getScreenHandler = ({ getRegionScreen }) => setScreens(getRegionScreen);
  const createScreenHandler = ({ createScreen }) => {
    setScreens(createScreen);
    setDrawerBody(null);
  };
  const createRegionHandler = ({ createRegion }) => {
    setRegions(createRegion);
    setDrawerBody(null);
  };
  const updateRegionHandler = ({ updateRegion }) => {
    setRegions(updateRegion);
    setDrawerBody(null);
  };
  const updateScreenHandler = ({ updateScreen }) => {
    setScreens(updateScreen);
    setDrawerBody(null);
  };
  const deleteRegionHandler = ({ deleteRegion }) => {
    setRegions(deleteRegion);
    setScreens(null);
    setSelectedRegion(null);
    setDrawerBody(null);
  };
  const deleteScreenHandler = ({ deleteScreen }) => {
    setScreens(deleteScreen);
    setSelectedScreen(null);
    setDrawerBody(null);
  };
  const [fetchRegions] = useLazyQuery(GET_MAP_REGIONS, {
    onCompleted: (data) => getRegionsHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on load Map Region',
      });
    },
  });
  const [fetchScreens] = useLazyQuery(GET_REGIONS_SCREEN, {
    onCompleted: (data) => getScreenHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on load Region Screen',
      });
    },
  });
  const [createRegion] = useMutation(CREATE_MAP_REGION, {
    onCompleted: (data) => createRegionHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on create Region',
      });
    },
  });
  const [updateRegion] = useMutation(UPDATE_MAP_REGION, {
    onCompleted: (data) => updateRegionHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on update Region',
      });
    },
  });
  const [updateScreen] = useMutation(UPDATE_REGION_SCREEN, {
    onCompleted: (data) => updateScreenHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on update Screen',
      });
    },
  });
  const [deleteRegion] = useMutation(DELETE_MAP_REGION, {
    onCompleted: (data) => deleteRegionHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on delete Region',
      });
    },
  });
  const [createScreen] = useMutation(CREATE_REGION_SCREEN, {
    onCompleted: (data) => createScreenHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on create Region Screen',
      });
    },
  });
  const [deleteScreen] = useMutation(DELETE_REGION_SCREEN, {
    onCompleted: (data) => deleteScreenHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on delete Screen',
      });
    },
  });
  useEffect(() => {
    fetchRegions({
      variables: {
        map: activeMap.id,
      },
    });
  }, []);
  useEffect(() => {
    if (selectedRegion) {
      fetchScreens({
        variables: {
          reg: selectedRegion.id,
        },
      });
    }
  }, [selectedRegion]);

  return (
    <>
      <div className="col-span-12 p-2 mb-5 flex justify-center">
        {regions
        && regions.map((region) => (
          <Button
            htmlType="submit"
            key={region.id}
            onClick={() => {
              setSelectedScreen(null);
              setSelectedRegion(region);
            }}
            type={
              selectedRegion
                ? selectedRegion.id === region.id && 'primary'
                : 'default'
            }
            size="large"
            className="rounded font-bold mr-2"
          >
            {region.name}
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
          && screens.map((screen) => (
            <Button
              htmlType="submit"
              key={screen.id}
              onClick={() => setSelectedScreen(screen)}
              type={
                selectedScreen
                  ? selectedScreen.id === screen.id && 'primary'
                  : 'default'
              }
              className="rounded font-bold mr-2"
            >
              {screen.name}
            </Button>
          ))}

          <Button
            htmlType="submit"
            type="primary"
            ghost
            onClick={() => {
              setDrawerTitle(<DrawerTitle text="New Screen" />);
              setDrawerBody(
                <NewScreenForm
                  activeRegion={selectedRegion}
                  createScreen={createScreen}
                />
              );
            }}
            className="rounded font-bold  mr-2"
            icon={<i className="fa fa-plus mr-2" />}
          >
            Add Screen
          </Button>
          {selectedScreen && (
            <Button
              htmlType="submit"
              type="primary"
              ghost
              onClick={() => {
                setDrawerTitle(<DrawerTitle text="Edit Screen" />);
                setDrawerBody(
                  <NewScreenForm
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
              Edit
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
  }),
};

MapScreens.defaultProps = {
  activeMap: {},
};

export default MapScreens;
