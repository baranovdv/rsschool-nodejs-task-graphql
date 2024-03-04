import { PrismaClient } from "@prisma/client";
import { MemberTypeId } from "../../member-types/schemas.js";
import DataLoader from "dataloader";

export type RequestArgs = {
  id?: string;
  memberTypeId?: MemberTypeId;
}

export type User = {
  id: string;
  name: string;
  balance: number;
}

export type CreateUser = {
  name: string;
  balance: number;
}

export type ChangeUser = Partial<CreateUser>;

export type CreatePost = {
  title: string;
  content: string;
  authorId: string;
}

export type ChangePost = Partial<CreatePost>;

export type CreateProfile = {
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: MemberTypeId;
}

export type ChangeProfile = Partial<CreateProfile>;

export type ContextValueType = {
  prisma: PrismaClient,
  dataloaders: {
    memberLoader: DataLoader<string, {
      id: string;
      discount: number;
      postsLimitPerMonth: number;
  } | undefined, string>,
    postsLoader: DataLoader<string, {
      id: string;
      title: string;
      content: string;
      authorId: string;
  }[], string>,
  profileLoader: DataLoader<string, {
    id: string;
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    memberTypeId: string;
  } | undefined, string>,
    subscribeToUser: DataLoader<string, User[], string>,
    userSubscribeTo: DataLoader<string, User[], string>
  }
}