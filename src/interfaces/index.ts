import { Types } from 'mongoose';

// ---------- Role ----------
export type Role = 'user' | 'admin';

// ---------- User ----------
export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role;
  interests: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ---------- Note ----------
export interface INote {
  _id: Types.ObjectId;
  title: string;
  content: string;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// ---------- Post ----------
export interface IPost {
  _id: Types.ObjectId;
  title: string;
  content: string;
  author: Types.ObjectId; 
  createdAt: Date;
  updatedAt: Date;
}

// ---------- JWT ----------
export interface JwtPayload {
  id: string;
  role: Role;
}


export interface RegisterBody {
  name: string;
  email: string;
  password: string;
  interests?: string[];
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface CreateNoteBody {
  title: string;
  content: string;
}

export type UpdateNoteBody = Partial<CreateNoteBody>;

export interface CreatePostBody {
  title: string;
  content: string;
}

// Admin: user তৈরি/আপডেট
export interface CreateUserBody extends RegisterBody {
  role?: Role;
}

export type UpdateUserBody = Partial<CreateUserBody>;


// ---------- Pagination ----------
export interface PaginationQuery {
  page: number;
  limit: number;
  skip: number;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}


// ---------- Aggregation results ----------

export interface InterestGroup {
  interest: string;
  count: number;
  users: { _id: Types.ObjectId; name: string; email: string }[];
}


export interface UserWithPosts {
  _id: Types.ObjectId;
  name: string;
  email: string;
  posts: IPost[];
}