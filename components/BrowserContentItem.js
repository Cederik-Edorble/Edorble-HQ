import PropTypes from 'prop-types';
import React from 'react';

const BrowserContentItem = ({ content, showContentForm }) => {
  const iconClass = `${'fa text-5xl bg-clip-text text-transparent bg-gradient-to-r'
    + ' from-green-400 to-green-700 p-2 cursor-pointer '}${content ? 'fa-check' : 'fa-plus-circle'}`;
  return (
    <span className="display-inline-grid">
      <i
        role="presentation"
        className={iconClass}
        onClick={() => showContentForm(content)}
      />
    </span>
  );
};
BrowserContentItem.propTypes = {
  content: PropTypes.shape({
    description: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    created: PropTypes.string,
    index: PropTypes.number
  }),

  showContentForm: PropTypes.func.isRequired
};
BrowserContentItem.defaultProps = {
  content: null
};
export default BrowserContentItem;
