import IUser from "../model/user.interface";
import IuserRepository from "../repository/user_repository.interface";
import Ipassword_service from "../service/password_service.interface";
import { Itoken_Service } from "../service/token_service.interface";
export interface IResponse{
    user:IUser,
    accessToken:string,
    refreshToken:string
}
export default interface IuserUsecase {
    login(email: string, password: string): Promise<IResponse>
    signup(userData: IUser): Promise<IUser | null>
    refresh_token(token:string): Promise<string>
}

export interface IuserUseCaseDepencies {
    repository: {
        UserRepository: IuserRepository
    },
    service: {
        passwordService: Ipassword_service,
        tokenService:Itoken_Service
    }
}