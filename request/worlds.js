import gql from 'graphql-tag';

const request = {
  GET_WORLDS: gql`
    query Worlds {
      Worlds {
        name
        mapID
        id
        defaultLogoURL
        ResourceID
        WorldMapInteractiveContentHolderContentMappings {
          Content {
            description
            title
            id
            url
            ResourceID
          }
          InteractiveContentHolderID
          InteractiveContentHolder {
            id
            RegionID
          }
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
          ResourceID
          WorldMapInteractiveContentHolderContentMappings {
            Content {
              description
              title
              id
              url
              ResourceID
            }
            InteractiveContentHolderID
            InteractiveContentHolder {
              id
              RegionID
            }
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
          ResourceID
          WorldMapInteractiveContentHolderContentMappings {
            Content {
              description
              title
              id
              url
              ResourceID
            }
            InteractiveContentHolderID
            InteractiveContentHolder {
              id
              RegionID
            }
          }
        }
      }
    }
  `,
};

export default request;
