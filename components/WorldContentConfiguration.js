import PropTypes from 'prop-types';
import ContentSection from './ContentSection';

const WorldContentConfiguration = ({ activeWorld }) => {
  return (
    <>
      <div className="col-span-12">
        {activeWorld.name}
      </div>
      .
    </>
  );
};
WorldContentConfiguration.propTypes = {
  activeWorld: PropTypes.shape({
    name: PropTypes.string,
  }),
};

WorldContentConfiguration.defaultProps = {
  activeWorld: null,
};

export default WorldContentConfiguration;
