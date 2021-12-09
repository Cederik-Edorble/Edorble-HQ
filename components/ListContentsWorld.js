import PropTypes from 'prop-types';
import Button from './UI/Button/Button';
import string from '../constants/strings';
import styles from '../styles/ListContentsWorld.module.scss';
import RegionContainer from './RegionContainer';

const ListContentsWorld = ({ addContent, regionContents, clickButton }) => (
  <div className={styles.container}>
    <div className={styles.btnContainer}>
      <Button color="addContent" onClick={addContent}>
        {string.addContent}
      </Button>
    </div>
    {regionContents && regionContents.map((item, index) => (
      <RegionContainer
        key={[item.region, index].join('_')}
        label={`${item.region}`}
        list={item.contents}
        nameRegion={item.name}
        clickButton={clickButton}
      />
    ))}
  </div>
);

ListContentsWorld.propTypes = {
  addContent: PropTypes.func,
  regionContents: PropTypes.arrayOf(PropTypes.shape({})),
  clickButton: PropTypes.func,
};

ListContentsWorld.defaultProps = {
  addContent: () => {},
  regionContents: [],
  clickButton: () => {},
};

export default ListContentsWorld;
