import gql from 'graphql-tag';

const request = {
  GET_REGIONS_HOLDERS: gql`
    query Regions($_eq: Int) {
      Regions(where: {MapRegionMappings: {MapID: {_eq: $_eq}}}) {
        id
        name
        InteractiveContentHolders {
          RegionID
          ResourceID
          id
          name
          InteractiveContentHolderType
        }
      }
    }
  `,
  CREATE_CONTENT_MAPPINGS: gql`
    mutation createContentWold(
      $ContentID: Int, 
      $InteractiveContentHolderID: Int, 
      $MapID: Int, 
      $WorldID: Int) {
      insert_WorldMapInteractiveContentHolderContentMapping(
        objects: {
          WorldID: $WorldID, 
          MapID: $MapID, 
          InteractiveContentHolderID: $InteractiveContentHolderID, 
          ContentID: $ContentID}) {
        returning {
          WorldID
          MapID
        }
      }
    }
  `,
  REMOVE_CONTENT_MAPPINGS: gql`
    mutation removeAddedContent(
      $_eq: Int, 
      $_eq1: Int, 
      $_eq2: Int, 
      $_eq3: Int) {
      delete_WorldMapInteractiveContentHolderContentMapping(
        where: {
          MapID: {_eq: $_eq2}, 
          WorldID: {_eq: $_eq3}, 
          InteractiveContentHolderID: {_eq: $_eq1}, 
          ContentID: {_eq: $_eq}}) {
        returning {
          WorldID
          MapID
        }
      }
    }
  `,
  UPDATE_CONTENT_MAPPINGS: gql`
    mutation updateMapping(
      $ContentID: Int, 
      $InteractiveContentHolderID: Int, 
      $_eq: Int, 
      $_eq1: Int, 
      $_eq2: Int, 
      $_eq3: Int) {
      update_WorldMapInteractiveContentHolderContentMapping(
        where: {
          WorldID: {_eq: $_eq3}, 
          MapID: {_eq: $_eq2}, 
          ContentID: {_eq: $_eq}, 
          InteractiveContentHolder: {id: {_eq: $_eq1}}
        }, 
        _set: {
          InteractiveContentHolderID: $InteractiveContentHolderID, 
          ContentID: $ContentID}) {
        returning {
          WorldID
          MapID
        }
      }
    }
  `,
};

export default request;
