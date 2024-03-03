import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, } from "graphql";
import { MemberTypeIdType } from "../memberTypeId.js";

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: {
      type: GraphQLBoolean
    },
    yearOfBirth: {
      type: GraphQLInt
    },
    memberTypeId: {
      type: MemberTypeIdType
    },
  }
})