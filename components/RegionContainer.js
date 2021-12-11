import PropTypes from 'prop-types';
import styles from '../styles/RegionContainer.module.scss';
import ItemContent from './ItemContent';
import TextField from './UI/TextField/TextField';

const RegionContainer = ({
  list, label, nameRegion, clickButton 
}) => (
  <div className={styles.container}>
    <div className={styles.boxTitle}>
      <TextField styleType="textTitleContent" text={`Region: ${nameRegion}`} />
      <TextField styleType="textTitleContent" text={`id${label}`} />
    </div> 
    {list && list.map((item, index) => (
      <ItemContent
        key={[item.Content.title, index].join('_')}
        contentName={item.Content.title}
        contentType={item.Content.ContentType}
        holderType={item.InteractiveContentHolder.InteractiveContentHolderType}
        textBtn="edit"
        clickButton={clickButton}
        idContent={item.Content.id}
        idHolder={item.InteractiveContentHolder.id}
      />
    ))}
  </div>
);

RegionContainer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})),
  label: PropTypes.string,
  nameRegion: PropTypes.string,
  clickButton: PropTypes.func,
};

RegionContainer.defaultProps = {
  list: [],
  label: '',
  nameRegion: '',
  clickButton: () => {},
};

export default RegionContainer;
