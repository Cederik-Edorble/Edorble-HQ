import PropTypes from 'prop-types';
import styles from '../styles/Input.module.scss';

const Input = ({
  onChange, value, placeholder, className, id, styleType, type, checked
}) => (
  <input
    type={type}
    onChange={onChange}
    value={value}
    required
    className={className || `${styles[styleType]}`}
    placeholder={placeholder}
    id={id}
    checked={checked}
  />
);

Input.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  styleType: PropTypes.string,
  type: PropTypes.string
};

Input.defaultProps = {
  onChange: () => {},
  placeholder: '',
  className: '',
  id: '',
  styleType: '',
  type: 'text',
  checked: false,
};

export default Input;
