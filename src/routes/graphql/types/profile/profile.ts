import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "../uuid.js";
import { MemberTypeIdType } from "../memberType/memberTypeId.js";
import { PrismaClient } from "@prisma/client";
import { profileSchema } from "../../../profiles/schemas.js";
import { MemberTypesType } from "../memberType/memberType.js";

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
      resolve: async (rootQuery, _, context: PrismaClient) => {
        const memberType = await context.memberType.findUnique({
          where: {
            id: (rootQuery as typeof profileSchema).memberTypeId as string,
          },
        });

        return memberType;
      }
    }
  })
})