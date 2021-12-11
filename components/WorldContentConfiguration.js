import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ListContentsWorld from './ListContentsWorld';
import styles from '../styles/WorldContentConfiguration.module.scss';
import TextField from './UI/TextField/TextField';
import DrawerTitle from './DrawerTitle';
import AddContentInWorldForm from './AddContentInWorldForm';
import ConfigurationPanel from './ConfigurationPanel';

const WorldContentConfiguration = ({
  activeWorld,
  setDrawerTitle,
  setDrawerBody,
  regions,
  content,
  addContentMapping,
  removeContentMapping,
  updateContentMapping,
  createParametersConfiguration, 
  updateParametersConfiguration,
}) => {
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

  const getName = (idRegion, array) => {
    const getItem = array.filter((item) => item.id === idRegion);
    return getItem.length > 0 ? getItem[0].name : ' ';
  };

  const getContents = (regionArray, array) => {
    const newArrayContent = [];
    regionArray.forEach((item) => {
      const newObject = {
        region: item,
        name: getName(item, regions),
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
    setDrawerTitle(<DrawerTitle text="Add Content in World" />);
    setDrawerBody(
      <AddContentInWorldForm
        mapId={activeWorld.mapID}
        worldId={activeWorld.id}
        listContents={content}
        listRegions={regions}
        createContentMapping={addContentMapping}
      />
    );
  };

  const getActiveContent = (array, id1, id2) => {
    const filterItems = array.filter((item) => item.Content.id === id1 && item.InteractiveContentHolder.id === id2);
    return filterItems[0];
  };

  const clickButton = ({ idContent, idHolder }) => {
    const array = activeWorld.WorldMapInteractiveContentHolderContentMappings;
    const getItem = getActiveContent(array, idContent, idHolder);
    setDrawerTitle(<DrawerTitle text="Edit Content in World" />);
    setDrawerBody(
      <AddContentInWorldForm
        mapId={activeWorld.mapID}
        worldId={activeWorld.id}
        listContents={content}
        listRegions={regions}
        createContentMapping={addContentMapping}
        activeContent={getItem}
        deleteContentMapping={removeContentMapping}
        updateContentMapping={updateContentMapping}
      />
    );
  };

  return (
    <div className={styles.container}>
      <TextField styleType="titleWorldSetting" text={activeWorld.name} />
      <div className={styles.content}>
        <ConfigurationPanel
          activeWorld={activeWorld}
          createParametersConfiguration={createParametersConfiguration}
          updateParametersConfiguration={updateParametersConfiguration}
        />
        <ListContentsWorld
          listContents={activeWorld.WorldMapInteractiveContentHolderContentMappings}
          addContent={addContent}
          idMap={activeWorld.mapID}
          regionContents={regionContents}
          clickButton={clickButton}
        />
      </div>
    </div>
  );
};
WorldContentConfiguration.propTypes = {
  activeWorld: PropTypes.shape({
    name: PropTypes.string,
    mapID: PropTypes.number,
    id: PropTypes.number,
    WorldMapInteractiveContentHolderContentMappings: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  setDrawerTitle: PropTypes.func.isRequired,
  setDrawerBody: PropTypes.func.isRequired,
  regions: PropTypes.arrayOf(PropTypes.shape({})),
  content: PropTypes.arrayOf(PropTypes.shape({})),
  addContentMapping: PropTypes.func,
  removeContentMapping: PropTypes.func,
  updateContentMapping: PropTypes.func,
  createParametersConfiguration: PropTypes.func,
  updateParametersConfiguration: PropTypes.func,
};

WorldContentConfiguration.defaultProps = {
  activeWorld: null,
  regions: [],
  content: [],
  addContentMapping: () => {},
  removeContentMapping: () => {},
  updateContentMapping: () => {},
  createParametersConfiguration: () => {},
  updateParametersConfiguration: () => {},
};

export default WorldContentConfiguration;
