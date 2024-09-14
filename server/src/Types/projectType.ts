import { GraphQLObjectType, GraphQLString } from "graphql";
import { Client } from "@/Model/client.model";
import { ClientType } from "./clientType";

export const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    clientId: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent) {
        return Client.findById(parent.clientId).exec();
      },
    },
  }),
});
