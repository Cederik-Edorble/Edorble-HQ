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
      }
    }
  `,
  CREATE_MAP: gql`
    mutation insert_Maps($object: [Maps_insert_input!]!) {
      insert_Maps(objects: $object) {
        returning {
          name
          id
          fileName
          macLink
        }
      }
    }
  `,
};

export default request;
