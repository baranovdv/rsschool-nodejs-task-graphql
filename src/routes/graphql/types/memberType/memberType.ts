import { GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { MemberTypeIdType } from "../memberTypeId.js";

export const MemberTypesType = new GraphQLObjectType({
  name: 'MemberTypes',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(MemberTypeIdType)
    },
    discount: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    postsLimitPerMonth: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  })
})