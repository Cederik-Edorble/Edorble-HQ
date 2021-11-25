import PropTypes from 'prop-types';

const Input = ({
  onChange, value, placeholder, className, id
}) => (
  <input
    type="text"
    onChange={onChange}
    value={value}
    required
    className={className}
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
};

Input.defaultProps = {
  onChange: () => {},
  value: '',
  placeholder: '',
  className: '',
  id: ''
};

export default Input;
