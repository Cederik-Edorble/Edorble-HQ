import React, { useState, useEffect } from 'react';
import { Button, Drawer, notification } from 'antd';
import { useLazyQuery, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { GET_MAP_REGIONS } from '../GraphQL/region/query';
import { GET_REGIONS_SCREEN } from '../GraphQL/screen/query';
import {
  ADD_SCREEN_CONTENT,
  DELETE_SCREEN_CONTENT,
  GET_SCREEN_CONTENT,
} from '../GraphQL/content/query';
import ScreenBrowser from './ScreenBrowser';
import NewContentForm from './NewContentForm';
import DrawerTitle from './DrawerTitle';

const ContentScreen = ({ activeWorld }) => {
  const [regions, setRegions] = useState();
  const [screens, setScreens] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedScreen, setSelectedScreen] = useState();
  const [screenContent, setScreenContent] = useState(null);
  const [drawerTitle, setDrawerTitle] = useState();
  const [drawerBody, setDrawerBody] = useState();
  const getRegionsHandler = ({ getMapRegion }) => setRegions(getMapRegion);
  const getScreenHandler = ({ getRegionScreen }) => setScreens(getRegionScreen);
  const getContentHandler = ({ getScreenContent }) => setScreenContent(getScreenContent);
  const createContentHandler = ({ addContent }) => {
    setScreenContent(addContent);
    setDrawerBody(null);
  };
  const deleteContentHandler = ({ deleteContent }) => {
    setScreenContent(deleteContent);
    setDrawerBody(null);
  };
  const [fetchScreens] = useLazyQuery(GET_REGIONS_SCREEN, {
    onCompleted: (data) => getScreenHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on load Region Screen',
      });
    },
  });
  const [fetchRegions] = useLazyQuery(GET_MAP_REGIONS, {
    onCompleted: (data) => getRegionsHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on load Map Region',
      });
    },
  });
  const [fetchContent] = useLazyQuery(GET_SCREEN_CONTENT, {
    onCompleted: (data) => getContentHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on load Screen Content',
      });
    },
  });
  const [createContent] = useMutation(ADD_SCREEN_CONTENT, {
    onCompleted: (data) => createContentHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on create Screen Content',
      });
    },
  });
  const [deleteContent] = useMutation(DELETE_SCREEN_CONTENT, {
    onCompleted: (data) => deleteContentHandler(data),
    onError: () => {
      notification.error({
        message: 'Error',
        description: 'Error on Delete Screen Content',
      });
    },
  });
  useEffect(() => {
    fetchRegions({
      variables: {
        map: activeWorld.map,
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
    if (selectedScreen) {
      fetchContent({
        variables: {
          screen: selectedScreen.id,
          world: activeWorld.id
        },
      });
    }
  }, [selectedRegion, selectedScreen]);
  return (
    <>
      <Drawer
        title={drawerTitle}
        placement="right"
        closable
        onClose={() => setDrawerBody(null)}
        visible={drawerBody}
      >
        {drawerBody}
      </Drawer>
      {activeWorld.map ? (
        <>
          <div className="col-span-12 p-2 mb-5">
            <h1 className="text-center font-semibold text-edorble-500 w-full">
              To save content, select region and the desired screen,
              then add your links in the empty slots
            </h1>
          </div>
          <div className="col-span-12 p-2 mb-5 flex justify-center items-center">
            {regions?.length > 0 ? (
              <>
                <p className="text-edorble-500 font-semibold mr-5">Regions:</p>
                {regions.map((region) => (
                  <Button
                    htmlType="submit"
                    key={region.id}
                    onClick={() => {
                      setScreens(null);
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
              </>
            ) : (
              <p className="text-edorble-500 font-semibold">
                No regions configured for this map
              </p>
            )}
          </div>
        </>
      ) : (
        <div className="col-span-12 p-2 mb-5">
          <h1 className="text-center font-semibold text-edorble-500 w-full">
            Please select World Map
          </h1>
        </div>
      )}
      {activeWorld.map && selectedRegion && (
        <div className="col-span-12 p-2 mb-5 flex justify-center items-center">
          {screens?.length ? (
            <>
              <p className="text-edorble-500 font-semibold mr-5">Screens:</p>
              {screens.map((screen) => (
                <Button
                  htmlType="submit"
                  key={screen.id}
                  onClick={() => {
                    setSelectedScreen(screen);
                    setScreenContent(null);
                  }}
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
            </>
          ) : (
            <p className="text-edorble-500 font-semibold">
              No screens configured for this map
            </p>
          )}
        </div>
      )}

      {activeWorld.map && selectedRegion && selectedScreen && (
        <div className="col-span-12 border border-gray-200 bg-gray-100 p-2 rounded">
          <p className="text-edorble-500 font-semibold">Content slots: </p>
          <div className="grid grid-cols-12 mt-2 gap-2">
            <div
              className="col-span-12
            sm:block
            border-2
            border-edorble-100
            bg-white
            text-center
            rounded"
            >
              {screenContent && (
                <ScreenBrowser
                  content={screenContent}
                  showContentForm={(content) => {
                    setDrawerTitle(
                      <DrawerTitle
                        text={content?.id ? 'Edit Content' : 'New Content'}
                      />
                    );
                    setDrawerBody(
                      <NewContentForm
                        selectedScreen={selectedScreen}
                        content={content}
                        createContent={createContent}
                        deleteContent={deleteContent}
                        activeWorld={activeWorld}
                      />
                    );
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
ContentScreen.propTypes = {
  activeWorld: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    accessCode: PropTypes.number,
    enablePassword: PropTypes.bool,
    map: PropTypes.number,
  }),
};

ContentScreen.defaultProps = {
  activeWorld: null,
};

export default ContentScreen;
