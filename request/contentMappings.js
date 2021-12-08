import gql from 'graphql-tag';

const request = {
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
};

export default request;
