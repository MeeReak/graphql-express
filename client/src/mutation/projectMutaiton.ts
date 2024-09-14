import { gql } from "@apollo/client";

const CREATE_PROJECT = gql`
  mutation CreateClient($name: String!, $email: String!, $phone: String!) {
    createClient(name: $name, email: $email, phone: $phone) {
      id
      name
      description
      status
      clientId
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { CREATE_PROJECT, DELETE_PROJECT };
