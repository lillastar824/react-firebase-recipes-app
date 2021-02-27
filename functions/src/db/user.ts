import * as admin from "firebase-admin";

import {
  USER_COLLECTION,
  User
} from "@jurijtokarski/reabase-recipes-shared/database/user";

export const createUser = (update: Partial<User>) => admin.firestore()
  .collection(USER_COLLECTION)
  .doc()
  .set(update);

export const deleteUser = (id: string) => admin.firestore()
  .collection(USER_COLLECTION)
  .doc(id)
  .delete();