import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";
import { User } from "../types/common.js";

export const getUserSubscribedToLoader = (prisma: PrismaClient) => {
  const dataloader = new DataLoader(async (ids: readonly string[]) => {

    const users = await prisma.user.findMany({
      where: {
        subscribedToUser: {
          some: {
            subscriberId: { in: ids as string[] },
          },
        },
      },
      include: {
        subscribedToUser: true,
      },
    })

    const authors: Record<string, User[]> = {}

    users.forEach((user) => {
      user.subscribedToUser.forEach((sub) => {
        const author = sub.subscriberId

        if (authors[author] === undefined) {
          authors[author] = []
        }

        authors[author].push(user)
      })
    })

    const sortedInOrder = ids.map((id) => authors[id] || [])

    return sortedInOrder
  });

  return dataloader
}
