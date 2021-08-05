import React from 'react';
import PropTypes from 'prop-types';
import { SCREEN_CONTENT_COUNT } from '../commons/Variables';
import BrowserContentItem from './BrowserContentItem';

const ScreenBrowser = ({ content, showContentForm }) => {
  return (
    <>
      {[...Array(SCREEN_CONTENT_COUNT)].map((x, i) => (
        <BrowserContentItem
          content={content?.[i]}
          key={i}
          showContentForm={showContentForm}
        />
      ))}
    </>
  );
};

ScreenBrowser.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({})),
  showContentForm: PropTypes.func.isRequired
};
ScreenBrowser.defaultProps = {
  content: null
};
export default ScreenBrowser;
