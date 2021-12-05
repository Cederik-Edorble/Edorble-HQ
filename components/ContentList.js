import PropTypes from 'prop-types';
import styles from '../styles/ContentList.module.scss';
import ContentItem from './ContentItem';
import strings from '../constants/strings';

const ContentList = ({ list, removeItemContent, updateContent }) => (
  <div className={styles.container}>
    {list && list.map((item, index) => (
      <ContentItem
        key={[item.title, index].join('_')}
        name={item.title}
        type={item.ContentType}
        styleTypeText="contentItem"
        labelBtn={strings.removeContent}
        labelBtnEdit={strings.labelBtnEdit}
        styleBtn="removeContent"
        id={item.id}
        removeItemContent={removeItemContent}
        updateContent={updateContent}
      />
    ))}
  
  </div>
);

ContentList.defaultProps = {
  list: [],
  removeItemContent: () => {},
  updateContent: () => {},
};

ContentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})),
  removeItemContent: PropTypes.func,
  updateContent: PropTypes.func,
};

export default ContentList;
