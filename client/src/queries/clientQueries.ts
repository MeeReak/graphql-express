import { gql } from "@apollo/client";

const GET_CLIENT = gql`
  query getClient {
    getAllClient {
      id
      name
      email
      phone
    }
  }
`;

export { GET_CLIENT };
