import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export const getMemberTypeLoader = (prisma: PrismaClient) => {
  const dataloader = new DataLoader(async (ids: readonly string[]) => {

    const memberTypes = await prisma.memberType.findMany({
      where: {
        id: { in: ids as string[] },
      },
    })

    const sortedInOrder = ids.map(id => memberTypes.find(memberType => memberType.id === id));

    return sortedInOrder;
  });

  return dataloader
}