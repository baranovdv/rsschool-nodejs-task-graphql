import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLResolveInfo } from 'graphql';
import { UserType } from '../types/user/user.js';
import { MemberTypesType } from '../types/memberType/memberType.js';
import { PostType } from '../types/post/post.js';
import { ProfileType } from '../types/profile/profile.js';
import { UUIDType } from './../types/uuid.js';
import { MemberTypeIdType } from '../types/memberType/memberTypeId.js';
import { ContextValueType } from '../types/common.js';
import DataLoader from 'dataloader';

export const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberTypes: {
      type: new GraphQLList(MemberTypesType),
      resolve: async (_, __, context: ContextValueType) => {
        return context.prisma.memberType.findMany();
      }
    },

    users: {
      type: new GraphQLList(UserType),
      resolve: async (_, __, context: ContextValueType) => {
        return context.prisma.user.findMany();
      }
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_, __, context: ContextValueType) => {
        return context.prisma.post.findMany();
      }
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_, __, context: ContextValueType) => {
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
      resolve: async (_, { id }, context: ContextValueType) => {
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
      resolve: async (_, { id }, context: ContextValueType) => {
        // console.log(info.fieldNodes)
        // const {prisma, dataloaders} = context

        // let dataloader = dataloaders.get(info.fieldNodes);

        // if (!dataloader) {
        //   dataloader = new DataLoader(async (ids: readonly string[]) => {

        //     const users = await prisma.user.findMany({
        //       where: {
        //         id: { in: ids as string[] },
        //       },
        //     })

        //     const sortedInOrder = ids.map(id => users.find(user => user.id === id));
    
        //     return sortedInOrder;
        //   });

        //   dataloaders.set(info.fieldNodes, dataloader);
        // }

        // return dataloader.load(id);


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
      resolve: async (_, { id }, context: ContextValueType) => {
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
      resolve: async (_, { id }, context: ContextValueType) => {

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