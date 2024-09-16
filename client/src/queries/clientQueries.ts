import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query getClients {
    getAllClient {
      id
      name
      email
      phone
    }
  }
`;

const GET_CLIENT = gql`
  query getClients($id: ID!) {
    getClientById(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { GET_CLIENTS, GET_CLIENT };
