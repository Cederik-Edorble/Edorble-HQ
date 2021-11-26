import React from 'react';
import PropTypes from 'prop-types';
import { ADD_WORLD_ICON, EARTH_ICON } from '../commons/Content';
import NewWorldForm from './NewWorldForm';
import DrawerTitle from './DrawerTitle';

const WorldsList = ({
  worlds,
  setActiveWorld,
  setActiveTab,
  activeWorld,
  createWorld,
  setShowModal,
  setDrawerTitle,
}) => {
  return (
    worlds && (
      <>
        {worlds.map((world) => (
          <div
            role="presentation"
            className="col-span-6 md:col-span-3"
            key={world.id}
            onClick={() => {
              setActiveWorld(world);
              setActiveTab('settings');
            }}
          >
            <img className="w-16 cursor-pointer" src={EARTH_ICON} alt="" />
            <h2 className="text-edorble-400 font-bold">{world.name}</h2>
          </div>
        ))}

        <div className="col-span-6 md:col-span-3">
          <img
            className="w-16 cursor-pointer"
            onClick={() => {
              setDrawerTitle(<DrawerTitle text="New World" />);
              setShowModal(
                <NewWorldForm
                  activeWorld={activeWorld}
                  createWorld={createWorld}
                  earthIcon={EARTH_ICON}
                />
              );
            }}
            src={ADD_WORLD_ICON}
            role="presentation"
            alt="Add"
          />
        </div>
      </>
    )
  );
};

WorldsList.propTypes = {
  setActiveWorld: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  createWorld: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  setDrawerTitle: PropTypes.func.isRequired,
  worlds: PropTypes.arrayOf(PropTypes.shape({})),
  activeWorld: PropTypes.bool,
};

WorldsList.defaultProps = {
  worlds: [],
  activeWorld: false,
};

export default WorldsList;
