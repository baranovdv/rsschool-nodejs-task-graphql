import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, } from "graphql";
import { UUIDType } from "../uuid.js";
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
    userId: {
      type: UUIDType
    },
    memberTypeId: {
      type: MemberTypeIdType
    },
  }
})