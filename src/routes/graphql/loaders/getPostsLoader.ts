import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export const getPostsLoader = (prisma: PrismaClient) => {
  const dataloader = new DataLoader(async (ids: readonly string[]) => {

      const posts = await prisma.post.findMany({
        where: {
          authorId: { in: ids as string[] },
        },
      })

      const authors: Record<string, typeof posts> = {}

      posts.forEach((post) => {
        if (authors[post.authorId] === undefined) {
          authors[post.authorId] = []
        }

        authors[post.authorId].push(post)
      })

      const sortedInOrder = ids.map((id) => authors[id])

      return sortedInOrder
  });

  return dataloader
}