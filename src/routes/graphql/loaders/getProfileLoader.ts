import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export const getProfileLoader = (prisma: PrismaClient) => {
  const dataloader = new DataLoader(async (ids: readonly string[]) => {

      const profiles = await prisma.profile.findMany({
        where: {
          userId: { in: ids as string[] },
        },
      })

      const sortedInOrder = ids.map(id => profiles.find(profile => profile.userId === id));

      return sortedInOrder;
    });

  return dataloader
}