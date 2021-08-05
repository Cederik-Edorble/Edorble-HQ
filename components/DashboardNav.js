import React from 'react';
import PropTypes from 'prop-types';

const DashboardNav = ({
  activeWorld,
  setActiveTab,
  setActiveWorld,
  setActiveMap,
  activeTab,
  activeMap,
}) => {
  return (
    <>
      {(activeTab === 'worlds' || activeTab === 'maps') && (
        <div className="flex justify-around bg-edorble-400 p-2">
          <div
            role="presentation"
            className={`${
              activeTab === 'worlds' ? 'text-white' : 'text-edorble-100'
            } font-bold cursor-pointer`}
            onClick={() => setActiveTab('worlds')}
          >
            Worlds
          </div>
          <div
            role="presentation"
            className={`${
              activeTab === 'maps' ? 'text-white' : 'text-edorble-100'
            } font-bold cursor-pointer`}
            onClick={() => setActiveTab('maps')}
          >
            Maps
          </div>
        </div>
      )}
      {activeWorld && (
        <div className="flex justify-around bg-edorble-400 p-2">
          <div
            role="presentation"
            className="text-white font-bold cursor-pointer"
            onClick={() => {
              setActiveWorld(null);
              setActiveTab('worlds');
            }}
          >
            Back to Worlds
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab('settings')}
            className={`${activeTab === 'settings' ? 'text-white' : 'text-edorble-100'} font-bold cursor-pointer`}
          >
            Settings
          </div>

          <div
            role="presentation"
            onClick={() => setActiveTab('content')}
            className={`${activeTab === 'content' ? 'text-white' : 'text-edorble-100'} font-bold cursor-pointer`}
          >
            Content
          </div>
        </div>
      )}
      {activeMap && (
        <div className="flex justify-around bg-edorble-400 p-2">
          <div
            role="presentation"
            className="text-white font-bold cursor-pointer"
            onClick={() => {
              setActiveMap(null);
              setActiveTab('maps');
            }}
          >
            Back to Maps
          </div>
          <div
            role="presentation"
            onClick={() => setActiveTab('map-settings')}
            className={`${activeTab === 'map-settings' ? 'text-white' : 'text-edorble-100'} font-bold cursor-pointer`}
          >
            Settings
          </div>

          <div
            role="presentation"
            onClick={() => setActiveTab('screens')}
            className={`${activeTab === 'screens' ? 'text-white' : 'text-edorble-100'} font-bold cursor-pointer`}
          >
            Screens
          </div>
        </div>
      )}
    </>
  );
};

DashboardNav.propTypes = {
  activeWorld: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    accessCode: PropTypes.number,
    enablePassword: PropTypes.bool,
  }),
  activeMap: PropTypes.shape({}),
  activeTab: PropTypes.string.isRequired,
  setActiveWorld: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  setActiveMap: PropTypes.func.isRequired,
};

DashboardNav.defaultProps = {
  activeWorld: {},
  activeMap: {},
};

export default DashboardNav;
