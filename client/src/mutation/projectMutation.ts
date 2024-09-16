import { gql } from "@apollo/client";

const CREATE_PROJECT = gql`
  mutation CreateProject(
    $name: String!
    $description: String!
    $status: String!
    $clientId: String!
  ) {
    createProject(
      name: $name
      description: $description
      status: $status
      clientId: $clientId
    ) {
      id
      name
      description
      status
      clientId
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      name
      description
      status
      clientId
    }
  }
`;

export { CREATE_PROJECT, DELETE_PROJECT };
