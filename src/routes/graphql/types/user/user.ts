import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLResolveInfo, GraphQLString } from "graphql";
import { UUIDType } from "../uuid.js";
import { ProfileType } from "../profile/profile.js";
import { PostType } from "../post/post.js";
import { ContextValueType } from "../common.js";
import DataLoader from "dataloader";

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
      resolve: async (rootQuery, _, context: ContextValueType, info: GraphQLResolveInfo) => {
        const {prisma, dataloaders} = context

        let dataloader = dataloaders.get(info.fieldNodes);

        if (!dataloader) {
          dataloader = new DataLoader(async (ids: readonly string[]) => {

            const profiles = await prisma.profile.findMany({
              where: {
                userId: { in: ids as string[] },
              },
            })

            const sortedInOrder = ids.map(id => profiles.find(profile => profile.userId === id));
    
            return sortedInOrder;
          });

          dataloaders.set(info.fieldNodes, dataloader);
        }

        return dataloader.load(rootQuery.id);
      }
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (rootQuery, _, context: ContextValueType, info: GraphQLResolveInfo) => {
        const {prisma, dataloaders} = context

        let dataloader = dataloaders.get(info.fieldNodes);

        if (!dataloader) {
          dataloader = new DataLoader(async (ids: readonly string[]) => {

            const posts = await prisma.post.findMany({
              where: {
                authorId: { in: ids as string[] },
              },
            })

            const sortedInOrder = ids.map(id => posts.find(post => post.id === id));
    
            return sortedInOrder;
          });

          dataloaders.set(info.fieldNodes, dataloader);
        }

        return dataloader.load(rootQuery.id);
      }
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (rootQuery, _, context: ContextValueType, info: GraphQLResolveInfo) => {
        const {prisma, dataloaders} = context

        let dataloader = dataloaders.get(info.fieldNodes);

        if (!dataloader) {
          dataloader = new DataLoader(async (ids: readonly string[]) => {

            const users = await prisma.user.findMany({
              where: {
                userSubscribedTo: {
                  some: {
                    authorId: { in: ids as string[] },
                  },
                },
              },
              include: {
                userSubscribedTo: true,
              },
            })

            const sortedInOrder = ids.map(id => users.find(user => user.userSubscribedTo['subscriberId'] === id));
    
            return sortedInOrder;
          });

          dataloaders.set(info.fieldNodes, dataloader);
        }

        return dataloader.load(rootQuery.id);
      }
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (rootQuery, _, context: ContextValueType, info: GraphQLResolveInfo) => {
        const {prisma, dataloaders} = context

        let dataloader = dataloaders.get(info.fieldNodes);

        if (!dataloader) {
          dataloader = new DataLoader(async (ids: readonly string[]) => {

            const users = await prisma.user.findMany({
              where: {
                subscribedToUser: {
                  some: {
                    subscriberId: { in: ids as string[] },
                  },
                },
              },
              include: {
                subscribedToUser: true,
              },
            })

            const sortedInOrder = ids.map(id => users.find(user => user.subscribedToUser['authorId'] === id));

            return sortedInOrder;
          });

          dataloaders.set(info.fieldNodes, dataloader);
        }

        return dataloader.load(rootQuery.id);
      }
    }
  })
})