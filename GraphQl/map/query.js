import { gql } from '@apollo/client';

export const GET_USER_MAP = gql`
  query getUserMaps($user: Int) {
    getUserMaps(user: $user) {
      id
      name
      user
      created
    }
  }
`;

export const CREATE_USER_MAP = gql`
  mutation createMap($map:MapInput){
    createMap(input:$map){
      id
      name
      user
    }
  }
`;

export const UPDATE_USER_MAP = gql`
  mutation updateMap($map:MapUpdateInput){
      updateMap(input:$map){
        id
        name
        user
      }
  }
`;
export const DELETE_USER_MAP = gql`
  mutation deleteMap($id: Int){
    deleteMap(id:$id) {
      id
      name
      user
    }
  }
`;
