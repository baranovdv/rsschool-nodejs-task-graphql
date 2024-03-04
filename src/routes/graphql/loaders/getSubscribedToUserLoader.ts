import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";
import { User } from "../types/common.js";

export const getSubscribedToUserLoader = (prisma: PrismaClient) => {
  const dataloader = new DataLoader(async (ids: readonly string[]) => {
    const users = await prisma.user.findMany({
      where: {
        userSubscribedTo: {
          some: {
            authorId: { in: ids as string[] },
          },
        },
      },
      include: {
        userSubscribedTo: true,
      },
    })

    const subscribers: Record<string, User[]> = {}

    users.forEach((user) => {
      user.userSubscribedTo.forEach((sub) => {
        const author = sub.authorId

        if (subscribers[author] === undefined) {
          subscribers[author] = []
        }

        subscribers[author].push(user)
      })
    })

    const sortedInOrder = ids.map((id) => subscribers[id] || [])

    return sortedInOrder
  });

  return dataloader
}
