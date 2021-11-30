import gql from 'graphql-tag';

const request = {
  GET_CONTENTS: gql`
    query Contents {
      Contents {
        ResourceID
        id
        description
        title
        url
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
          Content {
            ResourceID
            description
            id
            title
            url
          }
          InteractiveContentHolderID
        }
      }
    }
  `,
  DELETE_CONTENT: gql`
    mutation deleteItem($_eq: Int , $_eq1: Int) {
      delete_WorldMapInteractiveContentHolderContentMapping(
        where: {
          WorldID: {_eq: $_eq},
          InteractiveContentHolder: {id: {_eq: $_eq1}
          }
        }) {
        returning {
          ContentID
        }
      }
    }
  `,
  UPDATE_CONTENT: gql`
    mutation updateContent($_eq: Int, $_eq1: Int, $ContentID: Int) {
      update_WorldMapInteractiveContentHolderContentMapping(
        where: {
          WorldID: {_eq: $_eq1},
          InteractiveContentHolderID: {_eq: $_eq}
        },
        _set: {ContentID: $ContentID}) {
        returning {
          Content {
            url
            title
            id
            description
            ResourceID
          }
          InteractiveContentHolderID
        }
      }
    }
  `,
};

export default request;
