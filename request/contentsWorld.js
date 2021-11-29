import gql from 'graphql-tag';

const request = {
  GET_CONTENTS: gql`
    query Contents {
      Contents {
        id
        description
        title
        url
        contentTypeID
      }
    }
  `,
  INSERT_CONTENT: gql`
    mutation insert_WorldMapInteractiveContentHolderContentMapping(
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
          Content {
            description
            id
            title
            url
          }
        }
      }
    }
  `,
};

export default request;
