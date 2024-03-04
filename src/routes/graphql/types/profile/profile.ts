import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "../uuid.js";
import { MemberTypeIdType } from "../memberType/memberTypeId.js";
import { profileSchema } from "../../../profiles/schemas.js";
import { MemberTypesType } from "../memberType/memberType.js";
import { ContextValueType } from "../common.js";

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType)
    },
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
    memberType: {
      type: MemberTypesType,

      resolve: async (rootQuery: typeof profileSchema, _, context: ContextValueType) => {
        const {dataloaders} = context
        return dataloaders.memberLoader.load(rootQuery.memberTypeId as string)
      }
    }
  })
})

