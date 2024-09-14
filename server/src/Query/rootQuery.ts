import { Client } from "@/Model/client.model";
import { Project } from "@/Model/project.model";
import { ClientType } from "@/Types/clientType";
import { ProjectType } from "@/Types/projectType";
import { GraphQLObjectType, GraphQLList, GraphQLID } from "graphql";

export const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllClient: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    getClientByID: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },

    getAllProject: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    getProjectByID: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
  },
});
