import gql from 'graphql-tag';

const request = {
  GET_WORLDS: gql`
    query Worlds {
      Worlds {
        name
        mapID
        id
        defaultLogoURL
        WorldMapInteractiveContentHolderContentMappings {
          WorldID
          MapID
          InteractiveContentHolder {
            InteractiveContentHolderType
            RegionID
            ResourceID
            id
            name
          }
          Content {
            id
            description
            title
            url
            ResourceID
            ContentType
          }
        }
        WorldParametersConfiguration {
          FlySpeed
          Is_SpatialAudioMode
          PasswordHash
          ResourceID
          RunSpeed
          id
          WalkPercentage
          AvatarTalkingIcon
        }
      }
    }
  `,
  CREATE_WORLD: gql`
   mutation insert_Worlds ($objects: [Worlds_insert_input!]!){
      insert_Worlds(objects: $objects) {
        returning {
          id
          name
          mapID
          defaultLogoURL
          WorldMapInteractiveContentHolderContentMappings {
            WorldID
            MapID
            InteractiveContentHolder {
              InteractiveContentHolderType
              RegionID
              ResourceID
              id
              name
            }
            Content {
              id
              description
              title
              url
              ResourceID
              ContentType
            }
          }
          WorldParametersConfiguration {
            FlySpeed
            Is_SpatialAudioMode
            PasswordHash
            ResourceID
            RunSpeed
            id
            WalkPercentage
            AvatarTalkingIcon
          }
        }
      }
    }
  `,
  UPDATE_WORLD: gql`
    mutation update_Worlds($_set: Worlds_set_input, $where: Worlds_bool_exp!) {
      update_Worlds(where: $where, _set: $_set) {
        returning {
          id
          name
          mapID
          defaultLogoURL
          WorldMapInteractiveContentHolderContentMappings {
            WorldID
            MapID
            InteractiveContentHolder {
              InteractiveContentHolderType
              RegionID
              ResourceID
              id
              name
            }
            Content {
              id
              description
              title
              url
              ResourceID
              ContentType
            }
          }
          WorldParametersConfiguration {
            FlySpeed
            Is_SpatialAudioMode
            PasswordHash
            ResourceID
            RunSpeed
            id
            WalkPercentage
            AvatarTalkingIcon
          }
        }
      }
    }
  `,
};

export default request;
