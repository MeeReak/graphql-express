import { Mutation } from "@/Mutation/mutation";
import { RootQuery } from "@/Query/rootQuery";
import { GraphQLSchema } from "graphql";

// Create the GraphQL schema and export it
export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
