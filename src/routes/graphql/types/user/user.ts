import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "../uuid.js";
import { ProfileType } from "../profile/profile.js";
import { PostType } from "../post/post.js";
import { ContextValueType } from "../common.js";

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
      resolve: async (rootQuery, _, context: ContextValueType) => {
        const {dataloaders} = context
        return dataloaders.profileLoader.load(rootQuery.id)
      }
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (rootQuery, _, context: ContextValueType) => {
        const {dataloaders} = context
        return dataloaders.postsLoader.load(rootQuery.id)
      }
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (rootQuery, _, context: ContextValueType) => {
        const {dataloaders} = context
        return dataloaders.subscribeToUser.load(rootQuery.id)
      }
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (rootQuery, _, context: ContextValueType) => {
        const {dataloaders} = context
        return dataloaders.userSubscribeTo.load(rootQuery.id)
      }
    }
  })
})