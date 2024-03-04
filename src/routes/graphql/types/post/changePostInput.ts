import { GraphQLInputObjectType, GraphQLString } from "graphql";

export const ChangePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: {
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    },
  }
})