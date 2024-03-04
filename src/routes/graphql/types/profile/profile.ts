import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLResolveInfo } from "graphql";
import { UUIDType } from "../uuid.js";
import { MemberTypeIdType } from "../memberType/memberTypeId.js";
import { profileSchema } from "../../../profiles/schemas.js";
import { MemberTypesType } from "../memberType/memberType.js";
import { ContextValueType } from "../common.js";
import DataLoader from "dataloader";

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

      resolve: async (rootQuery: typeof profileSchema, _, context: ContextValueType, info: GraphQLResolveInfo) => {
        const {prisma, dataloaders} = context

        let dataloader = dataloaders.get(info.fieldNodes);

        if (!dataloader) {
          dataloader = new DataLoader(async (ids: readonly string[]) => {

            const memberTypes = await prisma.memberType.findMany({
              where: {
                id: { in: ids as string[] },
              },
            })

            const sortedInOrder = ids.map(id => memberTypes.find(memberType => memberType.id === id));
    
            return sortedInOrder;
          });

          dataloaders.set(info.fieldNodes, dataloader);
        }

        return dataloader.load(rootQuery.memberTypeId as string);
      }
    }
  })
})