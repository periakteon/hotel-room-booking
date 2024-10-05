import UserModel, { User } from "../models/user.model";

export function createUser(input: Omit<User, "validatePassword">) {
  return UserModel.create(input);
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}
