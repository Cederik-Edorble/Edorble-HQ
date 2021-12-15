import PropTypes from 'prop-types';
import styles from '../styles/Contents.module.scss';
import MenuContent from './MenuContent';
import DrawerTitle from './DrawerTitle';
import NewContentForm from './NewContentForm';
import ContentList from './ContentList';
import { filterArray } from '../Utils/helper';

const Contents = ({
  content,
  createContent,
  setShowModal,
  setDrawerTitle, 
  contentType,
  resources, 
  deleteContent,
  updateContentItem,
  
}) => {
  const createItem = () => {
    setDrawerTitle(
      <DrawerTitle text="New content" />
    );
    setShowModal(
      <NewContentForm 
        createContent={createContent}
        contentType={contentType} 
        resources={resources}
      />
    );
  };

  const removeItemContent = (id) => {
    deleteContent({
      variables: {
        _eq: id
      }
    });
  };

  const updateContent = (id) => {
    let item = {};
    if (content) {
      item = filterArray(content, 'id', id);
    }

    setDrawerTitle(
      <DrawerTitle text="Update content" />
    );
    setShowModal(
      <NewContentForm 
        createContent={createContent}
        contentType={contentType} 
        resources={resources}
        content={item[0]}
        updateContentItem={updateContentItem}
      />
    );
  };
  
  return (
    <div className={styles.container}>
      <MenuContent createItem={createItem} />
      <ContentList
        list={content}
        removeItemContent={removeItemContent}
        updateContent={updateContent}
      />
    </div>
  ); 
};

Contents.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({})),
  contentType: PropTypes.arrayOf(PropTypes.shape({})),
  resources: PropTypes.arrayOf(PropTypes.shape({})),
  createContent: PropTypes.func,
  setShowModal: PropTypes.func,
  setDrawerTitle: PropTypes.func,
  deleteContent: PropTypes.func,
  updateContentItem: PropTypes.func,
};
Contents.defaultProps = {
  content: [],
  contentType: [],
  resources: [],
  createContent: () => {},
  setShowModal: () => {},
  setDrawerTitle: () => {},
  deleteContent: () => {},
  updateContentItem: () => {},
};

export default Contents;
