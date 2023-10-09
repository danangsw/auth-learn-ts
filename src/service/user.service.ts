import { User, UserModel } from "../model/user.model";

export function createUser(input: Partial<User>) {
    return UserModel.create(input);
}