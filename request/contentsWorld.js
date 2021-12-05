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
        ContentType
      }
    }
  `,
  CREATE_CONTENT: gql`
    mutation CreateContents(
      $ContentType: ContentTypes_enum,
      $ResourceID: bigint,
      $description: String,
      $title: String,
      $url: String) {
      insert_Contents(objects: {
        description: $description,
        title: $title,
        url: $url,
        ContentType: $ContentType,
        ResourceID: $ResourceID
            }) {
        returning {
          url
          title
          id
          description
          ContentType
          ResourceID
        }
      }
    }
  `,
  GET_CONTENT_TYPE: gql`
    query ContentTypes {
      ContentTypes {
        ContentType
      }
    }
  `,
  DELETE_CONTENT: gql`
    mutation deleteContent($_eq: Int) {
      delete_Contents(where: {id: {_eq: $_eq}}) {
        returning {
          id
        }
      }
    }
  `,
  UPDATE_CONTENT: gql`
    mutation create(
      $_eq: Int,
      $ContentType: ContentTypes_enum,
      $ResourceID: bigint,
      $description: String,
      $title: String,
      $url: String) {
      update_Contents(
        where: {
          id: {_eq: $_eq}},
           _set: {
            url: $url,
            title: $title, 
            description: $description, 
            ResourceID: $ResourceID, 
            ContentType: $ContentType}) {
        returning {
          ContentType
          ResourceID
          description
          id
          title
          url
        }
      }
    }
  `
};

export default request;
