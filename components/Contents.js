import PropTypes from 'prop-types';
import styles from '../styles/Contents.module.scss';
import MenuContent from './MenuContent';
import DrawerTitle from './DrawerTitle';
import NewContentForm from './NewContentForm';
import ContentList from './ContentList';

const Contents = ({
  content,
  createContent,
  setShowModal,
  setDrawerTitle, 
  contentType,
  resources, 
  deleteContent
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

  return (
    <div className={styles.container}>
      {console.log(content)}
      <MenuContent createItem={createItem} />
      <ContentList list={content} removeItemContent={removeItemContent} />
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
};
Contents.defaultProps = {
  content: [],
  contentType: [],
  resources: [],
  createContent: () => {},
  setShowModal: () => {},
  setDrawerTitle: () => {},
  deleteContent: () => {},
};

export default Contents;
