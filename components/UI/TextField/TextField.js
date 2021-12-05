import PropTypes from 'prop-types';
import styles from './TextField.module.scss';

const TextField = ({ text, styleType }) => (
  <span className={`${styles.text} ${styles[styleType]}`}>
    {text}
  </span>
);

TextField.defaultProps = {
  text: '',
  styleType: ''
};

TextField.propTypes = {
  text: PropTypes.string,
  styleType: PropTypes.string,
};

export default TextField;
