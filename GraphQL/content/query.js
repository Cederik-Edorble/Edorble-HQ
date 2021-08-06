import { gql } from '@apollo/client';

export const GET_SCREEN_CONTENT = gql`
  query getScreenContent($screen: Int) {
    getScreenContent(screen: $screen) {
      id
      screen
      created
      description
      title
      type
      url
    }
  }
`;

export const ADD_SCREEN_CONTENT = gql`
  mutation addContent($contentInput: ContentInput){
    addContent(input: $contentInput ){
      id
      screen
      type
      url
      description
      title
      created
    }
  }
`;
export const DELETE_SCREEN_CONTENT = gql`
  mutation deleteContent($id: Int){
    deleteContent(id: $id ){
      id
      screen
      type
      url
      description
      title
      created
    }
  }
`;
