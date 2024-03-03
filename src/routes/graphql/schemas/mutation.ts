import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UserType } from "../types/user/user.js";
import { PrismaClient } from "@prisma/client";
import { CreatePost, CreateProfile, CreateUser } from "../types/common.js";
import { PostType } from "../types/post/post.js";
import { CreatePostInputType } from "../types/post/createPostInput.js";
import { ProfileType } from "../types/profile/profile.js";
import { CreateProfileInputType } from "../types/profile/createProfileInput.js";
import { CreateUserInputType } from "../types/user/createUserInput.js";


export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        dto: {
          type: new GraphQLNonNull(CreateUserInputType),
        },
      },
      resolve: async (_, args: {dto: CreateUser}, context: PrismaClient) => {

        const user =  context.user.create({
          data: args.dto,
        });

        return user;
      }
    },

    createPost: {
      type: PostType,
      args: {
        dto: {
          type: new GraphQLNonNull(CreatePostInputType),
        },
      },
      resolve: async (_, args: {dto: CreatePost}, context: PrismaClient) => {

        const user =  context.post.create({
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

        const user =  context.profile.create({
          data: args.dto,
        });

        return user;
      }
    }
  }
})