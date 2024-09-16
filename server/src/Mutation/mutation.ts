import { Client } from "@/Model/client.model";
import { Project } from "@/Model/project.model";
import { ClientType } from "@/Types/clientType";
import { ProjectType } from "@/Types/projectType";
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} from "graphql";

export const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createClient: {
      type: ClientType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const response = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return response.save();
      },
    },

    updateClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Client.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
              phone: args.phone,
            },
          },
          { new: true }
        );
      },
    },

    deleteClient: {
      type: ClientType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, arg) {
        await Project.deleteMany({ clientId: arg.id });

        return Client.findByIdAndDelete(arg.id);
      },
    },

    createProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) },
        clientId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, arg) {
        const response = new Project({
          name: arg.name,
          description: arg.description,
          status: arg.status,
          clientId: arg.clientId,
        });
        return response.save();
      },
    },

    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: { type: new GraphQLNonNull(GraphQLString) },
        clientId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
              clientId: args.clientId,
            },
          },
          { new: true }
        );
      },
    },

    deleteProject: {
      type: ProjectType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, arg) {
        return Project.findByIdAndDelete(arg.id);
      },
    },
  }),
});
