import { Types } from "mongoose";

export enum UserRole {
    ADMIN = "admin",
    SENDER = "sender", 
    RECEIVER = "receiver"
}

export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

export interface IUser {
   _id ?: Types.ObjectId
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isDeleted?: string;
  
  isVerified?: boolean;
  isBlocked?: boolean;
auths: IAuthProvider[];
 }

// export interface IAuthProvider {
//   provider: "google" | "credentials";
//   providerId: string;
// }

// export enum IsActive {
//   ACTIVE = "ACTIVE",
//   INACTIVE = "INACTIVE",
//   BLOCKED = "BLOCKED",
// }

// export interface IUser {
//   _id?: Types.ObjectId;
//   name: string;
//   email: string;
//   password?: string;
//   phone?: string;
//   picture?: string;
//   address?: string;
//   isDeleted?: string;
//   isActive?: IsActive;
//   isVerified?: boolean;
//   role: Role;
//   auths: IAuthProvider[];
//   parcel?: Types.ObjectId[];
