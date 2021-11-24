import '../styles/globals.css';
import Apollo from '../layouts/Apollo/Apollo';
import PropTypes from 'prop-types';

const App = (props) => <Apollo {...props} />;

App.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  pageProps: PropTypes.shape({}).isRequired
};
export default App;
