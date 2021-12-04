import PropTypes from 'prop-types';
import TextField from './UI/TextField/TextField';
import Button from './UI/Button/Button';
import string from '../constants/strings';
import styles from '../styles/MenuContainer.module.scss';

const MenuContent = ({ createItem }) => (
  <div className={styles.container}>
    <TextField text="Contents" styleType="textTitleContent" />
    <Button color="addContent" onClick={createItem}>
      {string.addContent}
    </Button>
  </div>
);

MenuContent.defaultProps = {
  createItem: () => {},
};

MenuContent.propTypes = {
  createItem: PropTypes.func,
};

export default MenuContent;
