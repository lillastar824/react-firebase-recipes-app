import * as functions from "firebase-functions";

import {
  UserRole,
  UserStatus
} from "@jurijtokarski/reabase-recipes-shared/database/user";

import {
  createUser,
  deleteUser
} from "./db/user";

export const handleFirebaseUserCreate = functions.auth.user().onCreate(user => createUser({
  name: user.displayName,
  email: user.email,
  role: UserRole.USER,
  status: UserStatus.ACTIVE
}));

export const handleFirebaseUserDelete = functions.auth.user().onDelete(user => deleteUser(user.uid));