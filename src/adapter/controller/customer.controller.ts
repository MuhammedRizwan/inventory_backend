import { NextFunction, Request, Response } from "express";
import status_code from "../../domain/constants/status_code";
import ApiResponse from "../../domain/interface/response/response";
import response_message from "../../domain/constants/response_message";
import IcustomerController, { IcustomerControllerDependencies } from "../../domain/interface/controller/customer_controller.interface";
import IcustomerUsecase from "../../domain/interface/use_case/customer_use_case.interface";




export default class CustomerController  implements IcustomerController {
    private _customer_usecase:IcustomerUsecase

    constructor(dependencies: IcustomerControllerDependencies) {
        this._customer_usecase=dependencies.customer_usecase
    }

    async get_customer(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {userId}=req.params
            const customers = await this._customer_usecase.getAllcustomers(userId);
            res.
                status(status_code.OK).
                json(ApiResponse.successResponse(response_message.FETCH_CUSTOMER_DATA, customers));
        } catch (error) {
            next(error);
        }
    }

    async add_customer(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, mobile, address } = req.body
            const {userId}=req.params
            if (!name || !email || !mobile || !address) {
                res
                    .status(status_code.BAD_REQUEST)
                    .json(ApiResponse.errorResponse("All fields are required", status_code.BAD_REQUEST));
                return
            }

            const customer = await this._customer_usecase.addcustomer(userId,req.body);
            res.
                status(status_code.CREATED).
                json(ApiResponse.successResponse(response_message.CUSTOMER_ADDED, customer, status_code.CREATED));
        } catch (error) {
            next(error);
        }
    }

    async edit_customer(req: Request, res: Response, next: NextFunction) :Promise<void>{
        try {
            const { customerId } = req.params;
            const updatedcustomer = await this._customer_usecase.editcustomer(customerId, req.body);

            res
                .status(status_code.OK)
                .json(ApiResponse.successResponse(response_message.CUSTOMER_UPDATED, updatedcustomer));

        } catch (error) {
            next(error);
        }
    }

    async delete_customer(req: Request, res: Response, next: NextFunction) :Promise<void> {
        try {
            const { customerId } = req.params;
            await this._customer_usecase.deletecustomer(customerId);

            res
            .status(status_code.OK).json(ApiResponse.successResponse(response_message.CUSTOMER_DELETED));
        } catch (error) {
            next(error);
        }
    }
}
