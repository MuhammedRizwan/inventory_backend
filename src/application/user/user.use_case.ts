import IUser from "../../domain/interface/model/user.interface";
import IuserUsecase, { IuserUseCaseDepencies } from "../../domain/interface/use_case/user_use_case.interface";
import IUserRepository from "../../domain/interface/repository/user_repository.interface";
import AppError from "../../domain/error/app_error";
import status_code from "../../domain/constants/status_code";
import response_message from "../../domain/constants/response_message";
import Ipassword_service from "../../domain/interface/service/password_service.interface";



export default class UserUseCase implements IuserUsecase {
    private _user_repository: IUserRepository;
    private _password_service: Ipassword_service;

    constructor(dependencies: IuserUseCaseDepencies) {
        this._user_repository = dependencies.repository.UserRepository;
        this._password_service = dependencies.service.passwordService;
    }

    async login(email: string, password: string): Promise<IUser> {
        try {

            const user = await this._user_repository.findByEmail(email);

            if (!user) {
                throw new AppError(status_code.BAD_REQUEST, response_message.INVALID_EMAIL)
            }

            const isMatch = await this._password_service.comparePassword(password, user.password);
            if (!isMatch) {
                throw new AppError(status_code.BAD_REQUEST, response_message.INVALID_PASSWORD)
            }

            return user;
        } catch (error) {
            throw error
        }
    }
    async signup(userData: IUser): Promise<IUser | null> {
        try {
            const existingUser = await this._user_repository.findByEmail(userData.email);
            if (existingUser) {
                throw new AppError(status_code.CONFLICT, response_message.EMAIL_ALREADY_EXIST)
            }

            userData.password = await this._password_service.hashPassword(userData.password);

            const user = await this._user_repository.create(userData);
            if (!user) {
                throw new AppError(status_code.INTERNAL_SERVER_ERROR, response_message.SOMETHING_WENT_WRONG)
            }
            return user
        } catch (error) {
            throw error
        }

    }
}
