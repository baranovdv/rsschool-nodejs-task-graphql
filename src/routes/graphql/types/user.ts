import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { ProfileType } from "./profile.js";
import { PrismaClient } from "@prisma/client";
import { userFields, userSchema } from "../../users/schemas.js";
import { PostType } from "./post.js";

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: new GraphQLNonNull(UUIDType)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    profile: {
      type: ProfileType,
      resolve: async (rootQuery, _, context: PrismaClient) => {

        const profile = await context.profile.findUnique({
          where: {
            userId: (rootQuery as typeof userSchema).id as string,
          },
        });

        return profile;
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (rootQuery, __, context: PrismaClient) => {
        const posts = await context.post.findMany({
          where: {
            authorId: (rootQuery as typeof userSchema).id as string,
          },
        });

        return posts;
      }
    }
  }
})