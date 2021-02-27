export const USER_COLLECTION = "users";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN"
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED"
}

export interface User {
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
}