import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull } from "graphql";
import { UUIDType } from "../uuid.js";
import { MemberTypeIdType } from "../memberType/memberTypeId.js";

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    userId: {
      type: new GraphQLNonNull(UUIDType)
    },
    memberTypeId: {
      type: new GraphQLNonNull(MemberTypeIdType)
    },
  }
})