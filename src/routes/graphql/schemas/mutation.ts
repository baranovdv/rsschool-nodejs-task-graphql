import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UserType } from "../types/user/user.js";
import { PrismaClient } from "@prisma/client";
import { ChangePost, ChangeProfile, ChangeUser, CreatePost, CreateProfile, CreateUser } from "../types/common.js";
import { PostType } from "../types/post/post.js";
import { CreatePostInputType } from "../types/post/createPostInput.js";
import { ProfileType } from "../types/profile/profile.js";
import { CreateProfileInputType } from "../types/profile/createProfileInput.js";
import { CreateUserInputType } from "../types/user/createUserInput.js";
import { UUIDType } from "../types/uuid.js";
import { ChangeUserInputType } from "../types/user/changeUserInput.js";
import { ChangePostInputType } from "../types/post/changePostInput.js";
import { ChangeProfileInputType } from "../types/profile/changeProfileInput.js";


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
    },

    changePost: {
      type: PostType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        },
        dto: {
          type: new GraphQLNonNull(ChangePostInputType),
        },
      },
      resolve: async (_, args: {id: string, dto: ChangePost}, context: PrismaClient) => {
        const post = await context.post.update({
          where: { id: args.id },
          data: args.dto,
        });

        return post;
      }
    },

    changeUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        },
        dto: {
          type: new GraphQLNonNull(ChangeUserInputType),
        },
      },
      resolve: async (_, args: {id: string, dto: ChangeUser}, context: PrismaClient) => {
        const user = await context.user.update({
          where: { id: args.id },
          data: args.dto,
        });

        return user;
      }
    },

    changeProfile: {
      type: ProfileType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType)
        },
        dto: {
          type: new GraphQLNonNull(ChangeProfileInputType),
        },
      },
      resolve: async (_, args: {id: string, dto: ChangeProfile}, context: PrismaClient) => {
        const profile = await context.profile.update({
          where: { id: args.id },
          data: args.dto,
        });

        return profile;
      }
    },

    subscribeTo: {
      type: UserType,
      args: {
        userId: {
          type: new GraphQLNonNull(UUIDType)
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType)
        },
      },
      resolve: async (_, args: {userId: string, authorId: string}, context: PrismaClient) => {
        const user = await context.user.update({
          where: {
            id: args.userId,
          },
          data: {
            userSubscribedTo: {
              create: {
                authorId: args.authorId,
              },
            },
          },
        });

        return user;
      }
    },

    unsubscribeFrom: {
      type: UUIDType,
      args: {
        userId: {
          type: new GraphQLNonNull(UUIDType)
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType)
        },
      },
      resolve: async (_, args: {userId: string, authorId: string}, context: PrismaClient) => {
        await context.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId,
            },
          },
        });

        return null;
      }

    }
  }
})