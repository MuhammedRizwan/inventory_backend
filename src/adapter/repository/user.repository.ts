import IUser from "../../domain/interface/model/user.interface";
import IuserRepository from "../../domain/interface/repository/user_repository.interface";
import UserModel from "../database/user.model";

export default class UserRepository implements IuserRepository {

    async create(user_data: IUser): Promise<IUser> {
        try {
            return UserModel.create(user_data)
        } catch (error) {
            throw error
        }
    }

    async findById(id: string): Promise<IUser | null> {
        try {
            return UserModel.findById(id)
        } catch (error) {
            throw error
        }
    }
    async findByEmail(email: string): Promise<IUser | null> {
        try {
            return UserModel.findOne({ email })
        } catch (error) {
            throw error
        }
    }

}