import gql from 'graphql-tag';

const request = {
  CREATE_REGION: gql`
    mutation insert_Regions(
      $MapID: Int,
      $ResourceID: bigint,
      $ResourceID1: bigint,
      $name: String) {
      insert_Regions(
        objects: 
        {name: $name, 
        MapRegionMappings: {
          data: {
            MapID: $MapID, 
            ResourceID: $ResourceID
          }
        },
        ResourceID: $ResourceID1
        }) {
        returning {
          id
          name
          MapRegionMappings {
            MapID
          }
          ResourceID
        }
      }
    }
  `,
  DELETE_REGION: gql`
    mutation deleteRegion($_eq: Int, $_eq1: Int) {
      delete_MapRegionMapping(where: {MapID: {_eq: $_eq}, RegionID: {_eq: $_eq1}}) {
        returning {
          MapID
          RegionID
          Region {
            id
            name
          }
        }
      }
    }
  `,
  UPDATE_REGION: gql`
    mutation updateRegion($_eq: Int, $name: String) {
      update_Regions(where: {id: {_eq: $_eq}}, _set: {name: $name}) {
        returning {
          name
          id
          ResourceID
        }
      }
    }
  `,
  GET_SCREEN_TYPES: gql`
      query HolderTypes {
      InteractiveContentHolderTypes {
        InteractiveContentHolderType
      }
    }
  `,
  CREATE_SCREEN: gql`
    mutation createScreen(
      $InteractiveContentHolderType: InteractiveContentHolderTypes_enum, 
      $RegionID: Int, 
      $ResourceID: bigint) {
      insert_InteractiveContentHolder(objects: {
        InteractiveContentHolderType: $InteractiveContentHolderType,
        ResourceID: $ResourceID, 
        RegionID: $RegionID},
        on_conflict: {
          constraint: InteractiveContentHolder_pkey, 
          update_columns: id}) {
        returning {
          id
        }
      }
    }
  `,
  DELETE_SCREEN: gql`
    mutation deleteScreen($_eq: Int, $_eq1: Int) {
      delete_InteractiveContentHolder(where: {RegionID: {_eq: $_eq}, id: {_eq: $_eq1}}) {
        returning {
          id
        }
      }
    }
  `,
  UPDATE_SCREEN: gql`
    mutation updateScreen(
      $_eq: Int, 
      $_eq1: Int, 
      $InteractiveContentHolderType: InteractiveContentHolderTypes_enum) {
      update_InteractiveContentHolder(
        where: {
          id: {_eq: $_eq1}, 
          RegionID: {_eq: $_eq}},
           _set: {
             InteractiveContentHolderType: $InteractiveContentHolderType}) {
        returning {
          id
        }
      }
    }
  `,
};

export default request;
