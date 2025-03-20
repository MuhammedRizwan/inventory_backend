import { Request, Response, NextFunction } from "express";
import IuserController, { IuserControllerDependencies } from "../../domain/interface/controller/user_controller.interface";
import ApiResponse from "../../domain/interface/response/response";
import status_code from "../../domain/constants/status_code";
import IuserUsecase from "../../domain/interface/use_case/user_use_case.interface";
import response_message from "../../domain/constants/response_message";

export default class UserController implements IuserController {
    private _user_usecase: IuserUsecase;

    constructor(dependencies: IuserControllerDependencies) {
        this._user_usecase = dependencies.userUsecase
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res
                    .status(status_code.BAD_REQUEST)
                    .json(ApiResponse.errorResponse(response_message.EMAIL_PASSWORD_REQUIRED, status_code.BAD_REQUEST));
                return
            }

            const user = await this._user_usecase.login(email, password);

            res
                .status(status_code.OK)
                .json(ApiResponse.successResponse(response_message.USER_LOGIN, user));
        } catch (error) {
            next(error);

        }
    }
    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, mobile, password } = req.body;
            if (!name || !email || !mobile || !password) {
                res
                    .status(status_code.BAD_REQUEST)
                    .json(ApiResponse.errorResponse("All fields are required", status_code.BAD_REQUEST));
                return
            }

            const newUser = await this._user_usecase.signup(req.body);
            res
                .status(status_code.CREATED)
                .json(ApiResponse.successResponse(response_message.USER_REGISTERED, newUser, status_code.CREATED));
        } catch (error) {
            next(error);
        }
    }
}
