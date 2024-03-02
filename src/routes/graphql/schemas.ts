import { Type } from '@fastify/type-provider-typebox';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library.js';
import { GraphQLList, GraphQLObjectType } from 'graphql';
import { UserType } from './types/user.js';
import { MemberTypesType } from './types/memberType.js';
import { PostType } from './types/post.js';
import { ProfileType } from './types/profile.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export function getRootQuery(prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
  const rootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
      memberTypes: {
        type: new GraphQLList(MemberTypesType),
        resolve: async () => {
          return prisma.memberType.findMany();
        }
      },
      users: {
        type: new GraphQLList(UserType),
        resolve: async () => {
          return prisma.user.findMany();
        }
      },
      posts: {
        type: new GraphQLList(PostType),
        resolve: async () => {
          return prisma.post.findMany();
        }
      },
      profiles: {
        type: new GraphQLList(ProfileType),
        resolve: async () => {
          return prisma.profile.findMany();
        }
      },
    }
  })

  return rootQuery
}

// export const rootQuery = new GraphQLObjectType({
//   name: 'Query',
//   fields: {
//     users: {
//       type: new GraphQLList(UserType),
//       resolve: async () => {
//         return prisma.user.findMany();
//       }
//     }
//   }
// })