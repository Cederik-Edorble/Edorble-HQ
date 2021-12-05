import PropTypes from 'prop-types';
import styles from '../styles/ContentItem.module.scss';
import TextField from './UI/TextField/TextField';
import Button from './UI/Button/Button';

const ContentItem = ({
  name, type, id, styleTypeText, labelBtn, styleBtn, removeItemContent, labelBtnEdit, updateContent
}) => (
  <div className={styles.container} id={id}>
    <TextField text={name} styleType={styleTypeText} />
    <TextField text={type} styleType={styleTypeText} />
    <Button color={styleBtn} onClick={() => updateContent(id)}>
      {labelBtnEdit}
    </Button>
    <Button color={styleBtn} onClick={() => removeItemContent(id)}>
      {labelBtn}
    </Button>
  </div>
);

ContentItem.defaultProps = {
  type: '',
  styleTypeText: '',
  labelBtn: '',
  styleBtn: '',
  labelBtnEdit: '',
  removeItemContent: () => {},
  updateContent: () => {},
};

ContentItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  id: PropTypes.number.isRequired,
  styleTypeText: PropTypes.string,
  labelBtn: PropTypes.string,
  styleBtn: PropTypes.string,
  removeItemContent: PropTypes.func,
  labelBtnEdit: PropTypes.string,
  updateContent: PropTypes.func,
};

export default ContentItem;
