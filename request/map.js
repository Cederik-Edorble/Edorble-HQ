import gql from 'graphql-tag';

const request = {
  GET_MAPS: gql`
    query Maps {
      Maps {
        name
        id
        fileName
        macLink
        windowsLink
        version
        ResourceID
        WorldMapInteractiveContentHolderContentMappings {
          Content {
            url
            title
            id
            description
          }
          InteractiveContentHolder {
            id
            RegionID
            InteractiveContentHolderType
          }
        }
        MapRegionMappings {
          MapID
          Region {
            name
            id
            InteractiveContentHolders {
              RegionID
              id
              InteractiveContentHolderType
            }
          }
        }
      }
    }
  `,
  CREATE_MAP: gql`
    mutation createMap(
      $ResourceID: bigint,
      $fileName: String,
      $macLink: String,
      $name: String,
      $version: String,
      $windowsLink: String) {
      insert_Maps(objects: {
        fileName: $fileName,
        macLink: $macLink,
        name: $name,
        version: $version,
        windowsLink: $windowsLink,
        ResourceID: $ResourceID
      }) {
        returning {
          name
          id
          fileName
          macLink
          windowsLink
          version
          ResourceID
          WorldMapInteractiveContentHolderContentMappings {
            Content {
              url
              title
              id
              description
            }
            InteractiveContentHolder {
              id
              RegionID
            }
          }
          MapRegionMappings {
            MapID
            Region {
              name
              id
              InteractiveContentHolders {
                RegionID
                id
              }
            }
          }
        }
      }
    }
  `,
  UPDATE_MAP: gql`
    mutation update_Maps(
      $_eq: Int,
      $ResourceID: bigint,
      $fileName: String,
      $macLink: String,
      $name: String,
      $version: String,
      $windowsLink: String) {
    update_Maps(
      where: {
        id: {_eq: $_eq}},
        _set: {
          name: $name,
          macLink: $macLink,
          version: $version,
          windowsLink: $windowsLink,
          fileName: $fileName,
          ResourceID: $ResourceID}) {
      returning {
        fileName
        name
        version
        windowsLink
        macLink
        ResourceID
        id
        WorldMapInteractiveContentHolderContentMappings {
            Content {
              url
              title
              id
              description
            }
            InteractiveContentHolder {
              id
              RegionID
            }
          }
        MapRegionMappings {
          MapID
          Region {
            name
            id
            InteractiveContentHolders {
              RegionID
              id
            }
          }
        }
      }
    }
  }
  `,
  DELETE_MAP: gql`
    mutation deleteMap($_eq: Int) {
      delete_Maps(where: {id: {_eq: $_eq}}) {
        returning {
          id
        }
      }
    }
  `,
};

export default request;
