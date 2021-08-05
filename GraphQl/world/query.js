import { gql } from '@apollo/client';

export const GET_USER_WORLDS = gql`
  query GetUserWorld($ownerId: Int) {
    getUserWorld(user: $ownerId) {
      id,name,password,enablePassword,user,accessCode,created,map
    }
  }
`;
export const UPDATE_USER_WORLD = gql`
  mutation UpdateWorld($updateWorldInput: WorldUpdateInput) {
    updateWorld(input: $updateWorldInput) {
      id,name,password,enablePassword,user,accessCode,user,created,map
    }
  }
`;

export const CREATE_USER_WORLD = gql`
  mutation CreateWorldMutation($createWorldInput: WorldCreteInput) {
    createWorld (input: $createWorldInput){
      id,name,password,enablePassword,user,accessCode,user,created,map
    }
  }
`;

export const DELETE_USER_WORLD = gql`
  mutation deleteWorld($id: Int){
    deleteWorld(id:$id) {
      id,name,password,enablePassword,user,accessCode,user,created,map
    }
  }
`;
