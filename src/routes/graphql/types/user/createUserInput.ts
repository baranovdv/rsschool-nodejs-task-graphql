import { GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },

    balance: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
  }
})