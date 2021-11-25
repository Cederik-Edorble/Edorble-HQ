import gql from 'graphql-tag';

const request = {
  GET_WORLDS: gql`
    query Worlds ($idUser: Int!) {
      Worlds(where: {User: {id: {_eq: $idUser}}}) {
        id
        mapID
        name
        User {
          email
          id
        }
      }
    }
  `,
  CREATE_WORLD: gql`
   mutation insert_Worlds ($objects: Worlds_insert_input!){
      insert_Worlds(objects: $objects) {
        returning {
          id
          name
          User {
            id
          }
        }
      }
    }
  `,
};

export default request;
