import IUser from "../../domain/interface/model/user.interface";
import IuserUsecase, { IResponse, IuserUseCaseDepencies } from "../../domain/interface/use_case/user_use_case.interface";
import IUserRepository from "../../domain/interface/repository/user_repository.interface";
import AppError from "../../domain/error/app_error";
import status_code from "../../domain/constants/status_code";
import response_message from "../../domain/constants/response_message";
import Ipassword_service from "../../domain/interface/service/password_service.interface";
import { Itoken_Service } from "../../domain/interface/service/token_service.interface";



export default class UserUseCase implements IuserUsecase {
    private _user_repository: IUserRepository;
    private _password_service: Ipassword_service;
    private _token_service: Itoken_Service

    constructor(dependencies: IuserUseCaseDepencies) {
        this._user_repository = dependencies.repository.UserRepository;
        this._password_service = dependencies.service.passwordService;
        this._token_service = dependencies.service.tokenService;
    }

    async login(email: string, password: string): Promise<IResponse> {
        try {

            const user = await this._user_repository.findByEmail(email);

            if (!user) {
                throw new AppError(status_code.BAD_REQUEST, response_message.INVALID_EMAIL)
            }

            const isMatch = await this._password_service.comparePassword(password, user.password);
            if (!isMatch) {
                throw new AppError(status_code.BAD_REQUEST, response_message.INVALID_PASSWORD)
            }
            const accessToken = await this._token_service.generateAccessToken(user._id as string)
            const refreshToken = await this._token_service.generateRefreshToken(user._id as string)
            if (!accessToken || !refreshToken) {
                throw new AppError(status_code.BAD_REQUEST, response_message.TOKEN_NOT_CREATED)
            }
            return { user, accessToken, refreshToken };
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
    async refresh_token(refreshToken: string): Promise<string> {
        try {
            if (!refreshToken) {
                throw new AppError(status_code.BAD_REQUEST, response_message.REFRESH_TOKEN_MISSING);
            }

            const payload = this._token_service.verifyRefreshToken(refreshToken);
            if (!payload) {
                throw new AppError(status_code.NOT_FOUND, response_message.TOKEN_EXPIRED)
            }

            const newAccessToken = this._token_service.generateAccessToken(payload.id);
            if (!newAccessToken) {
                throw new AppError(status_code.NOT_FOUND, response_message.ACCESS_TOKEN_MISSING)
            }

            return newAccessToken
        } catch (error) {
            throw error
        }
    }
}
