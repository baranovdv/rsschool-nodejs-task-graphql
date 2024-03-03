import { MemberTypeId } from "../../member-types/schemas.js";

export type RequestArgs = {
  id?: string;
  memberTypeId?: MemberTypeId;
}

export type CreateUser = {
  name: string;
  balance: number;
}

export type CreatePost = {
  title: string;
  content: string;
  authorId: string;
}

export type CreateProfile = {
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: MemberTypeId;
}