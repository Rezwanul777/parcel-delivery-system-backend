"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["SENDER"] = "sender";
    UserRole["RECEIVER"] = "receiver";
})(UserRole || (exports.UserRole = UserRole = {}));
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
