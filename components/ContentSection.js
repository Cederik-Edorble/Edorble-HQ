import PropTypes from 'prop-types';
import styles from '../styles/ContentSection.module.scss';
import constants from '../constants/strings';
import Button from './UI/Button/Button';
import ContentSelector from './ContentSelector';

const ContentSection = ({
  listContent, addContent, selectedContents, contentHandler, removeContent 
}) => (
  <div className={styles.container}>
    <Button color="addContent" onClick={addContent}>
      {constants.addContent}
    </Button>
    {selectedContents.length > 0 && selectedContents.map((_, index) => (
      <div key={[index, 'array'].join('_')} className={styles.wrapperSelect}>
        <ContentSelector
          contents={listContent}
          onChange={contentHandler}
          id={index}
          selectedItem={selectedContents[index].id}
        />
        <Button color="removeContent" onClick={() => removeContent(index)}>
          {constants.removeContent}
        </Button>
      </div>
    ))}
    
  </div>
);

ContentSection.propTypes = {
  listContent: PropTypes.arrayOf(PropTypes.shape({})),
  addContent: PropTypes.func,
  contentHandler: PropTypes.func,
  removeContent: PropTypes.func,
  selectedContents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number
  })),
};

ContentSection.defaultProps = {
  listContent: [],
  addContent: () => {},
  contentHandler: () => {},
  removeContent: () => {},
  selectedContents: []
};

export default ContentSection;
