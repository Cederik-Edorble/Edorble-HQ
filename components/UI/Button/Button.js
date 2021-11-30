import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({
  children, onClick, color, typeBtn, name, id 
}) => (
  <button
    className={`${styles.btn} ${color ? styles[color] : ''}`}
    onClick={(event) => onClick(event, id)}
    type={typeBtn ? 'button' : 'submit'}
    name={name}
    id={id}
  >
    {children}
  </button>
);

Button.defaultProps = {
  onClick: () => {},
  color: '',
  typeBtn: true,
  name: '',
  id: '',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  typeBtn: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
};

export default Button;
