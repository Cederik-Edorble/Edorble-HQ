import gql from 'graphql-tag';

const request = {
  GET_WORLDS: gql`
    query Worlds {
      Worlds {
        id
        name
        defaultLogoURL
      }
    }
  `,
  CREATE_WORLD: gql`
   mutation insert_Worlds ($objects: Worlds_insert_input!){
      insert_Worlds(objects: $objects) {
        returning {
          id
          name
        }
      }
    }
  `,
};

export default request;
