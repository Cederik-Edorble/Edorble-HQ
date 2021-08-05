import React from 'react';
import PropTypes from 'prop-types';

const DrawerTitle = ({ text }) => {
  return (
    <h1 className="text-edorble-500 font-bold">{text}</h1>
  );
};

DrawerTitle.propTypes = {
  text: PropTypes.string.isRequired
};

export default DrawerTitle;
