import IUser from "../model/user.interface";
import IuserRepository from "../repository/user_repository.interface";
import Ipassword_service from "../service/password_service.interface";

export default interface IuserUsecase {
    login(email: string, password: string): Promise<IUser>
    signup(userData: IUser): Promise<IUser | null>
}

export interface IuserUseCaseDepencies {
    repository: {
        UserRepository: IuserRepository
    },
    service: {
        passwordService: Ipassword_service
    }
}