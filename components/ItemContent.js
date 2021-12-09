import PropTypes from 'prop-types';
import styles from '../styles/ItemContent.module.scss';
import TextField from './UI/TextField/TextField';
import Button from './UI/Button/Button';

const ItemContent = ({
  contentName, contentType, holderType, textBtn, clickButton, idContent, idHolder
}) => (
  <div className={styles.container}>
    <TextField text={contentName} styleType="itemText" />
    <TextField text={contentType} styleType="itemText" />
    <TextField text={holderType} styleType="itemText" />
    <Button color="removeContent" onClick={() => clickButton({ idContent, idHolder })}>
      {textBtn}
    </Button>
  </div>
);

ItemContent.propTypes = {
  contentName: PropTypes.string,
  contentType: PropTypes.string,
  holderType: PropTypes.string,
  textBtn: PropTypes.string,
  clickButton: PropTypes.func,
  idContent: PropTypes.number.isRequired,
  idHolder: PropTypes.number.isRequired,

};

ItemContent.defaultProps = {
  contentName: '',
  contentType: '',
  holderType: '',
  textBtn: '',
  clickButton: () => {},
};

export default ItemContent;
