import IUser from "../model/user.interface";

export default interface IuserRepository {
    create(user_data: IUser): Promise<IUser>
    findById(id: string): Promise<IUser | null>
    findByEmail(email: string): Promise<IUser | null>
}