import { PrismaClient } from "@prisma/client"
import { getMemberTypeLoader } from "./getMemberTypeLoader.js"
import { getPostsLoader } from "./getPostsLoader.js"
import { getProfileLoader } from "./getProfileLoader.js"
import { getSubscribedToUserLoader } from "./getSubscribedToUserLoader.js"
import { getUserSubscribedToLoader } from "./getUserSubscribedToLoader.js"

export const getLoaders = (prisma: PrismaClient) => {
  return {
    memberLoader: getMemberTypeLoader(prisma),
    postsLoader: getPostsLoader(prisma),
    profileLoader: getProfileLoader(prisma),
    subscribeToUser: getSubscribedToUserLoader(prisma),
    userSubscribeTo: getUserSubscribedToLoader(prisma)
  }
}