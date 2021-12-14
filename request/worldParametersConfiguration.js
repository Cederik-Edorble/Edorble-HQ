import gql from 'graphql-tag';

const request = {
  INSERT_PARAMS: gql`
    mutation applyConfiguration(
      $AvatarTalkingIcon: Boolean, 
      $FlySpeed: numeric, 
      $Is_SpatialAudioMode: Boolean, 
      $PasswordHash: String, 
      $ResourceID: bigint, 
      $RunSpeed: numeric, 
      $WalkPercentage: numeric,
      $PushToTalk: Boolean) {
      insert_WorldParametersConfigurations(
        objects: {
          AvatarTalkingIcon: $AvatarTalkingIcon, 
          FlySpeed: $FlySpeed, 
          Is_SpatialAudioMode: $Is_SpatialAudioMode, 
          PasswordHash: $PasswordHash, 
          ResourceID: $ResourceID, 
          RunSpeed: $RunSpeed, 
          WalkPercentage: $WalkPercentage,
          PushToTalk: $PushToTalk,
          }, 
        on_conflict: {
          constraint: WorldParameters_pkey, 
          update_columns: id}) {
        returning {
          id
        }
      }
    }
  `,
  UPDATE_WORLD_PARAMS: gql`
    mutation updateConfiguration(
      $_eq: Int, 
      $WorldParametersConfigurationID: Int) {
      update_Worlds(
        where: {
          id: {_eq: $_eq}},
        _set: {WorldParametersConfigurationID: $WorldParametersConfigurationID}) {
        returning {
          id
        }
      }
    }
  `,
  UPDATE_PARAMS: gql`
    mutation updateParams(
      $_eq: Int, 
      $AvatarTalkingIcon: Boolean, 
      $FlySpeed: numeric, 
      $Is_SpatialAudioMode: Boolean, 
      $PasswordHash: String, 
      $RunSpeed: numeric, 
      $WalkPercentage: numeric,
      $PushToTalk: Boolean) {
      update_WorldParametersConfigurations(
        where: {id: {_eq: $_eq}}, 
        _set: {
          AvatarTalkingIcon: $AvatarTalkingIcon, 
          FlySpeed: $FlySpeed, 
          Is_SpatialAudioMode: $Is_SpatialAudioMode, 
          PasswordHash: $PasswordHash, 
          RunSpeed: $RunSpeed, 
          WalkPercentage: $WalkPercentage,
          PushToTalk: $PushToTalk
          }) {
        returning {
          id
        }
      }
    }
  `,
};

export default request;
