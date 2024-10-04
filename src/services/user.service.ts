import UserModel, { User } from "../models/user.model";

export function createUser(input: Omit<User, "validatePassword">) {
  return UserModel.create(input);
}
