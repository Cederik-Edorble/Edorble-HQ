import PropTypes from 'prop-types';
import styles from '../styles/RegionContainer.module.scss';
import ItemContent from './ItemContent';
import TextField from './UI/TextField/TextField';

const RegionContainer = ({ list, label }) => (
  <div className={styles.container}>
    <TextField styleType="textTitleContent" text={label} />
    {list && list.map((item, index) => (
      <ItemContent
        key={[item.Content.title, index].join('_')}
        contentName={item.Content.title}
        contentType={item.Content.ContentType}
        holderType={item.InteractiveContentHolder.InteractiveContentHolderType}
        textBtn="remove"
      />
    ))}
  </div>
);

RegionContainer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})),
  label: PropTypes.string,
};

RegionContainer.defaultProps = {
  list: [],
  label: ''

};

export default RegionContainer;
