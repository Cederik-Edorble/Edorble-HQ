import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import styles from '../styles/ConfigurationPanel.module.scss';

const ConfigurationPanel = ({ activeWorld }) => {
  const [fields, setFields] = useState({
    FlySpeed: 0,
    Is_SpatialAudioMode: false,
    RunSpeed: 0,
    WalkPercentage: 0,
    AvatarTalkingIcon: false,
  });

  const handlerInput = (event) => {
    const { id, value } = event.target;
    setFields({ ...fields, [id]: value });
  };

  const handlerCheckBox = (event) => {
    const { id, checked } = event.target;
    setFields({ ...fields, [id]: checked });
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <span>Fly Speed</span>
        <Input id="FlySpeed" onChange={handlerInput} value={fields.FlySpeed} type="number" />
      </div>
      <div className={styles.box}>
        <span>Run Speed</span>
        <Input id="RunSpeed" onChange={handlerInput} value={fields.RunSpeed} type="number" />
      </div>
      <div className={styles.box}>
        <span>Walk Percentage</span>
        <Input id="WalkPercentage" onChange={handlerInput} value={fields.WalkPercentage} type="number" />
      </div>
      <div className={styles.checkBox}>
        <Input
          id="Is_SpatialAudioMode"
          onChange={handlerCheckBox}
          checked={fields.Is_SpatialAudioMode}
          type="checkbox"
          value="text"
          className="worldSetting"
        />
        <span>Is Spatial Audio Mode</span>
      </div>
      <div className={styles.checkBox}>
        <Input
          id="AvatarTalkingIcon"
          onChange={handlerCheckBox}
          checked={fields.AvatarTalkingIcon}
          type="checkbox"
          value="text"
          className="worldSetting"
        />
        <span>Avatar Talking Icon</span>
      </div>
    </div>
  );
};

ConfigurationPanel.propTypes = {
  activeWorld: PropTypes.shape({}),
};

ConfigurationPanel.defaultProps = {
  activeWorld: {}
};

export default ConfigurationPanel;
