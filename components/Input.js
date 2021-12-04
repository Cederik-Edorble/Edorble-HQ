import PropTypes from 'prop-types';
import styles from '../styles/Input.module.scss';

const Input = ({
  onChange, value, placeholder, className, id, styleType, type
}) => (
  <input
    type={type}
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
  value: PropTypes.string || PropTypes.number,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  styleType: PropTypes.string,
  type: PropTypes.string
};

Input.defaultProps = {
  onChange: () => {},
  value: '',
  placeholder: '',
  className: '',
  id: '',
  styleType: '',
  type: 'text'
};

export default Input;
