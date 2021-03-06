import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MapSelector = ({ maps, activeWorld, updateWorld }) => {
  const [selectMap, setSelectMap] = useState(activeWorld.mapID);
  
  const mapChangeHandler = (e) => {
    const { value } = e.target;
    setSelectMap(value);
    if (value) {
      updateWorld({
        variables: {
          _set: {
            mapID: value
          },
          where: { id: { _eq: activeWorld.id } } 
        },
      });
    }
  };
  return (
    <div className="grid col-span-12 md:col-span-8 gap-4 mt-5 md:mt-0">
      <select value={selectMap ?? ''} onChange={mapChangeHandler}>
        <option value="">Not Select</option>
        {maps && maps.map((map) => (
          <option value={map.id} key={map.id}>
            {map.name}
          </option>
        ))}
      </select>
    </div>
  );
};
MapSelector.propTypes = {
  maps: PropTypes.arrayOf(PropTypes.shape({})),
  activeWorld: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    accessCode: PropTypes.number,
    enablePassword: PropTypes.bool,
    mapID: PropTypes.number,
  }).isRequired,
  updateWorld: PropTypes.func.isRequired,
};

MapSelector.defaultProps = {
  maps: []
};

export default MapSelector;
