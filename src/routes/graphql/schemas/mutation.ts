import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UserType } from "../types/user/user.js";
import { PrismaClient } from "@prisma/client";
import { CreatePost, CreateProfile, CreateUser } from "../types/common.js";
import { PostType } from "../types/post/post.js";
import { CreatePostInputType } from "../types/post/createPostInput.js";
import { ProfileType } from "../types/profile/profile.js";
import { CreateProfileInputType } from "../types/profile/createProfileInput.js";
import { CreateUserInputType } from "../types/user/createUserInput.js";
import { UUIDType } from "../types/uuid.js";


export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: {
      type: PostType,
      args: {
        dto: {
          type: new GraphQLNonNull(CreatePostInputType),
        },
      },
      resolve: async (_, args: {dto: CreatePost}, context: PrismaClient) => {

        const post = await context.post.create({
          data: args.dto,
        });

        return post;
      }
    },

    createUser: {
      type: UserType,
      args: {
        dto: {
          type: new GraphQLNonNull(CreateUserInputType),
        },
      },
      resolve: async (_, args: {dto: CreateUser}, context: PrismaClient) => {

        const user = await context.user.create({
          data: args.dto,
        });

        return user;
      }
    },

    createProfile: {
      type: ProfileType,
      args: {
        dto: {
          type: new GraphQLNonNull(CreateProfileInputType),
        },
      },
      resolve: async (_, args: {dto: CreateProfile}, context: PrismaClient) => {

        const profile = await context.profile.create({
          data: args.dto,
        });

        return profile;
      }
    },

    deletePost: {
      type: UUIDType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        },
      },
      resolve: async (_, args: {id: string}, context: PrismaClient) => {

        await context.post.delete({
          where: {
            id: args.id,
          },
        });

        return null;
      }
    },

    deleteUser: {
      type: UUIDType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        },
      },
      resolve: async (_, args: {id: string}, context: PrismaClient) => {

        await context.user.delete({
          where: {
            id: args.id,
          },
        });

        return null;
      }
    },

    deleteProfile: {
      type: UUIDType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        },
      },
      resolve: async (_, args: {id: string}, context: PrismaClient) => {

        await context.profile.delete({
          where: {
            id: args.id,
          },
        });

        return null;
      }
    }
  }
})