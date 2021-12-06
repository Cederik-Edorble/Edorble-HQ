import React from 'react';
import PropTypes from 'prop-types';
import { ADD_WORLD_ICON } from '../commons/Content';
import NewMapForm from './NewMapForm';
import DrawerTitle from './DrawerTitle';

const MapList = ({
  maps, setActiveMap, createMap, setShowModal, setDrawerTitle, setActiveTab, resources
}) => {
  return (
    <>
      {
        maps && maps.map((map) => (
          <div
            role="presentation"
            className="col-span-6 md:col-span-3"
            key={map.id}
            onClick={() => {
              setActiveMap(map);
              setActiveTab('map-settings');
            }}
          >
            <img
              className=" cursor-pointer map_image rounded"
              src="assets/img/map_icon.jpg"
              alt=""
            />
            <h2 className="text-edorble-400 font-bold">{map.name}</h2>
          </div>
        ))
      }
      <div className="col-span-6 md:col-span-3">
        <img
          className="w-16 cursor-pointer"
          onClick={() => {
            setDrawerTitle(
              <DrawerTitle text="New Map" />
            );
            setShowModal(
              <NewMapForm
                createMap={createMap}
                resources={resources}
              />
            );
          }}
          src={ADD_WORLD_ICON}
          role="presentation"
          alt=""
        />
      </div>
    </>
  );
};

MapList.propTypes = {
  maps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setActiveMap: PropTypes.func.isRequired,
  createMap: PropTypes.func.isRequired,
  setShowModal: PropTypes.func,
  setDrawerTitle: PropTypes.func,
  setActiveTab: PropTypes.func.isRequired,
  resources: PropTypes.arrayOf(PropTypes.shape({})),
};

MapList.defaultProps = {
  resources: [],
  setShowModal: () => {},
  setDrawerTitle: () => {},
};

export default MapList;
