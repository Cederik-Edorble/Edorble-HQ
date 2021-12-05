import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import DrawerTitle from './DrawerTitle';
import NewMapForm from './NewMapForm';

const MapSettings = ({
  activeMap,
  updateMap,
  drawerBody, 
  setDrawerBody, 
  drawerTitle, 
  setDrawerTitle,
  deleteMap,
  setIdMapActive
}) => {
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
      {activeMap && (
      <>
        <div className="grid col-span-12">
          <div className="grid grid-cols-12 gap-2 flex">
            <div className="grid col-span-12 md:col-span-3 gap-2 justify-center">
              <img src="assets/img/map_icon.jpg" alt="" />
            </div>
            <div className="grid col-span-12 md:col-span-8 gap-4 mt-10 md:mt-0">
              <h1 className="text-4xl text-edorble-300 font-bold w-full">
                {activeMap.name}
                <i
                  className="fa fa-edit float-right text-2xl cursor-pointer mt-1"
                  role="presentation"
                  onClick={() => {
                    setDrawerTitle(
                      <DrawerTitle text="Edit Map" />
                    );
                    setDrawerBody(
                      <NewMapForm
                        activeMap={activeMap}
                        updateMap={updateMap}
                        deleteMap={deleteMap}
                        setIdMapActive={setIdMapActive}
                      />
                    );
                  }}
                />
                <br />
              </h1>
            </div>
          </div>
        </div>
      </>
      )}
    </>
  );
};

MapSettings.propTypes = {
  activeMap: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }).isRequired,
  updateMap: PropTypes.func,
  deleteMap: PropTypes.func,
  drawerBody: PropTypes.node,
  drawerTitle: PropTypes.node,
  setDrawerTitle: PropTypes.func.isRequired,
  setDrawerBody: PropTypes.func.isRequired,
  setIdMapActive: PropTypes.func,
};
MapSettings.defaultProps = {
  drawerBody: null,
  drawerTitle: null,
  deleteMap: () => {},
  updateMap: () => {},
  setIdMapActive: () => {}
};

export default MapSettings;
