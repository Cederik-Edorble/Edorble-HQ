import gql from 'graphql-tag';

const request = {
  GET_WORLDS: gql`
    query Worlds {
      Worlds {
        name
        mapID
        id
        defaultLogoURL
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
        }
      }
    }
  `,
};

export default request;
