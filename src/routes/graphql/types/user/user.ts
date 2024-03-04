import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../uuid.js";
import { ProfileType } from "../profile/profile.js";
import { PrismaClient } from "@prisma/client";
import { PostType } from "../post/post.js";

export const UserType: GraphQLObjectType<{
  id: string,
  name: string,
  balance: number,
}> = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
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
      resolve: async (rootQuery, _, context: {prisma: PrismaClient}) => {

        const profile = await context.prisma.profile.findUnique({
          where: {
            userId: rootQuery.id,
          },
        });

        return profile;
      }
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (rootQuery, __, context: {prisma: PrismaClient}) => {
        const posts = await context.prisma.post.findMany({
          where: {
            authorId: rootQuery.id,
          },
        });

        return posts;
      }
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async(rootQuery, _, context: {prisma: PrismaClient}) => {
        const users = context.prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: rootQuery.id,
              },
            },
          },
        });

        return users;
      }
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async(rootQuery, _, context: {prisma: PrismaClient}) => {
        const users = context.prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: rootQuery.id,
              },
            },
          },
        });

        return users;
      }
    }
  })
})