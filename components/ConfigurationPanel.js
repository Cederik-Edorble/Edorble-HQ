import { useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import Button from './UI/Button/Button';
import string from '../constants/strings';
import styles from '../styles/ConfigurationPanel.module.scss';

const ConfigurationPanel = ({ activeWorld, createParametersConfiguration, updateParametersConfiguration }) => {
  const [fields, setFields] = useState({
    FlySpeed: activeWorld?.WorldParametersConfiguration?.FlySpeed ?? 0,
    Is_SpatialAudioMode: activeWorld?.WorldParametersConfiguration?.Is_SpatialAudioMode ?? false,
    RunSpeed: activeWorld?.WorldParametersConfiguration?.RunSpeed ?? 0,
    WalkPercentage: activeWorld?.WorldParametersConfiguration?.WalkPercentage ?? 0,
    AvatarTalkingIcon: activeWorld?.WorldParametersConfiguration?.AvatarTalkingIcon ?? false,
    PushToTalk: activeWorld?.WorldParametersConfiguration?.PushToTalk ?? false,
  });

  const handlerInput = (event) => {
    const { id, value } = event.target;
    setFields({ ...fields, [id]: value });
  };

  const handlerCheckBox = (event) => {
    const { id, checked } = event.target;
    setFields({ ...fields, [id]: checked });
  };

  const apply = (event) => {
    event.preventDefault();
    const idParam = activeWorld?.WorldParametersConfiguration?.id;
    if (idParam === 1) {
      createParametersConfiguration({
        variables: {
          AvatarTalkingIcon: fields.AvatarTalkingIcon, 
          FlySpeed: fields.FlySpeed, 
          Is_SpatialAudioMode: fields.Is_SpatialAudioMode, 
          PasswordHash: activeWorld?.WorldParametersConfiguration?.PasswordHash, 
          ResourceID: 30, 
          RunSpeed: fields.RunSpeed, 
          WalkPercentage: fields.WalkPercentage,
          PushToTalk: fields.PushToTalk
        }
      });
    } else {
      updateParametersConfiguration({
        variables: {
          _eq: idParam,
          AvatarTalkingIcon: fields.AvatarTalkingIcon, 
          FlySpeed: fields.FlySpeed, 
          Is_SpatialAudioMode: fields.Is_SpatialAudioMode, 
          PasswordHash: activeWorld?.WorldParametersConfiguration?.PasswordHash,  
          RunSpeed: fields.RunSpeed, 
          WalkPercentage: fields.WalkPercentage,
          PushToTalk: fields.PushToTalk
        }
      });
    }
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
      <div className={styles.checkBox}>
        <Input
          id="PushToTalk"
          onChange={handlerCheckBox}
          checked={fields.PushToTalk}
          type="checkbox"
          value="text"
          className="worldSetting"
        />
        <span>Push to talk</span>
      </div>
      <div className={styles.btnContainer}>
        <Button color="apply" onClick={apply}>
          {string.apply}
        </Button>
      </div>
    </div>
  );
};

ConfigurationPanel.propTypes = {
  activeWorld: PropTypes.shape({
    WorldParametersConfiguration: PropTypes.shape({
      FlySpeed: PropTypes.number,
      Is_SpatialAudioMode: PropTypes.bool,
      PushToTalk: PropTypes.bool,
      RunSpeed: PropTypes.number,
      WalkPercentage: PropTypes.number,
      AvatarTalkingIcon: PropTypes.bool,
      PasswordHash: PropTypes.string,
      id: PropTypes.number,
    }),
  }),
  createParametersConfiguration: PropTypes.func,
  updateParametersConfiguration: PropTypes.func,
};

ConfigurationPanel.defaultProps = {
  activeWorld: {},
  createParametersConfiguration: () => {},
  updateParametersConfiguration: () => {},
};

export default ConfigurationPanel;
