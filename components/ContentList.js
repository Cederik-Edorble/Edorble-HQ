import PropTypes from 'prop-types';
import styles from '../styles/ContentList.module.scss';
import ContentItem from './ContentItem';
import strings from '../constants/strings';

const ContentList = ({ list, removeItemContent }) => (
  <div className={styles.container}>
    {list && list.map((item, index) => (
      <ContentItem
        key={[item.title, index].join('_')}
        name={item.title}
        type={item.ContentType}
        styleTypeText="contentItem"
        labelBtn={strings.removeContent}
        styleBtn="removeContent"
        id={item.id}
        removeItemContent={removeItemContent}
      />
    ))}
  
  </div>
);

ContentList.defaultProps = {
  list: [],
  removeItemContent: () => {},
};

ContentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})),
  removeItemContent: PropTypes.func,
};

export default ContentList;
