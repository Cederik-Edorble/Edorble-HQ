import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ListContentsWorld from './ListContentsWorld';
import styles from '../styles/WorldContentConfiguration.module.scss';
import TextField from './UI/TextField/TextField';

const WorldContentConfiguration = ({ activeWorld, setDrawerTitle, setDrawerBody }) => {
  const [regionContents, setRegionContents] = useState();

  const filterArrayMap = (contents) => contents.filter((item) => item.MapID === activeWorld.mapID);

  const getRegions = (array) => {
    const arrayRegions = [];
    array.forEach((item) => {
      const checkIem = arrayRegions.indexOf(item?.InteractiveContentHolder?.RegionID);
      if (checkIem === -1) {
        arrayRegions.push(item?.InteractiveContentHolder?.RegionID);
      }
    });
    return arrayRegions;
  };

  const contentsForRegion = (idRegion, array) => array.filter(
    (item) => item.InteractiveContentHolder.RegionID === idRegion
  );
  
  const getContents = (regionArray, array) => {
    const newArrayContent = [];
    regionArray.forEach((item) => {
      const newObject = {
        region: item,
        contents: contentsForRegion(item, array)
      };
      newArrayContent.push(newObject);
    });
    
    return newArrayContent;
  };

  useEffect(() => {
    const array = [...activeWorld?.WorldMapInteractiveContentHolderContentMappings];
    const filterArrayToMap = filterArrayMap(array);
    const regionArray = getRegions(filterArrayToMap);
    const arrayContents = getContents(regionArray, array);
    setRegionContents(arrayContents);
  }, [activeWorld]);
  
  const addContent = () => {

  };

  return (
    <div className={styles.container}>
      <TextField styleType="titleWorldSetting" text={activeWorld.name} />
      <div className={styles.content}>
        <div className={styles.configurationPanel}>
          Configuration World panel
        </div>
        <ListContentsWorld
          listContents={activeWorld.WorldMapInteractiveContentHolderContentMappings}
          addContent={addContent}
          idMap={activeWorld.mapID}
          regionContents={regionContents}
        />
      </div>
    </div>
  );
};
WorldContentConfiguration.propTypes = {
  activeWorld: PropTypes.shape({
    name: PropTypes.string,
    mapID: PropTypes.number,
    WorldMapInteractiveContentHolderContentMappings: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  setDrawerTitle: PropTypes.func.isRequired,
  setDrawerBody: PropTypes.func.isRequired,
};

WorldContentConfiguration.defaultProps = {
  activeWorld: null,
};

export default WorldContentConfiguration;
