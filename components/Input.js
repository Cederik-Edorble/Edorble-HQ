import PropTypes from 'prop-types';
import styles from '../styles/Input.module.scss';

const Input = ({
  onChange, value, placeholder, className, id, styleType
}) => (
  <input
    type="text"
    onChange={onChange}
    value={value}
    required
    className={className || `${styles[styleType]}`}
    placeholder={placeholder}
    id={id}
  />
);

Input.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  styleType: PropTypes.string,
};

Input.defaultProps = {
  onChange: () => {},
  value: '',
  placeholder: '',
  className: '',
  id: '',
  styleType: '',
};

export default Input;
