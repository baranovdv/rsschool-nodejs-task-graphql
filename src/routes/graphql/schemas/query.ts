import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UserType } from '../types/user/user.js';
import { MemberTypesType } from '../types/memberType/memberType.js';
import { PostType } from '../types/post/post.js';
import { ProfileType } from '../types/profile/profile.js';
import { UUIDType } from './../types/uuid.js';
import { MemberTypeIdType } from '../types/memberType/memberTypeId.js';
import { PrismaClient } from '@prisma/client';

export const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberTypes: {
      type: new GraphQLList(MemberTypesType),
      resolve: async (_, __, context: {prisma: PrismaClient}) => {
        return context.prisma.memberType.findMany();
      }
    },

    users: {
      type: new GraphQLList(UserType),
      resolve: async (_, __, context: {prisma: PrismaClient}) => {
        return context.prisma.user.findMany();
      }
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_, __, context: {prisma: PrismaClient}) => {
        return context.prisma.post.findMany();
      }
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_, __, context: {prisma: PrismaClient}) => {
        return context.prisma.profile.findMany();
      }
    },

    memberType: {
      type: MemberTypesType,
      args: {
        id: {
          type: new GraphQLNonNull(MemberTypeIdType)
        },
      },
      resolve: async (_, { id }, context: {prisma: PrismaClient}) => {
        const memberType = await context.prisma.memberType.findUnique({
          where: {
            id: id as string,
          },
        });

        return memberType;
      }
    },

    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        },
      },
      resolve: async (_, { id }, context: {prisma: PrismaClient}) => {

        const user = await context.prisma.user.findUnique({
          where: {
            id: id as string,
          },
        });

        return user;
      }
    },

    post: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        },
      },
      resolve: async (_, { id }, context: {prisma: PrismaClient}) => {
        const post = await context.prisma.post.findUnique({
          where: {
            id: id as string,
          },
        });

        return post;
      }
    },

    profile: {
      type: ProfileType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        },
      },
      resolve: async (_, { id }, context: {prisma: PrismaClient}) => {

        const profile = await context.prisma.profile.findUnique({
          where: {
            id: id as string,
          },
        });

        return profile;
      }
    },
  })
})