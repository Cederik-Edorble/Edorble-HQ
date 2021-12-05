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
      {(activeTab === 'worlds' || activeTab === 'maps' || activeTab === 'contents') && (
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

          <div
            role="presentation"
            className={`${
              activeTab === 'contents' ? 'text-white' : 'text-edorble-100'
            } font-bold cursor-pointer`}
            onClick={() => setActiveTab('contents')}
          >
            Contents
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
            onClick={() => setActiveTab('World Content Configuration')}
            className={`${activeTab === 'World Content Configuration'
              ? 'text-white' : 'text-edorble-100'} font-bold cursor-pointer`}
          >
            World Content Configuration
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
            onClick={() => setActiveTab('Interactive Content Holder')}
            className={`${activeTab === 'Interactive Content Holder' 
              ? 'text-white' : 'text-edorble-100'} font-bold cursor-pointer`}
          >
            Interactive Content Holder
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
