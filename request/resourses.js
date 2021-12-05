import gql from 'graphql-tag';

const request = {
  GET_RESOURCES: gql`
    query Resources {
      Resources {
        id
      }
    }
  `,
};

export default request;
