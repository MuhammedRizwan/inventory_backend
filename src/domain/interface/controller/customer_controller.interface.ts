import { NextFunction, Request, Response } from "express"
import IcustomerUsecase from "../use_case/customer_use_case.interface"


export default interface IcustomerController {
    get_customer(req: Request, res: Response, next: NextFunction): Promise<void>
    add_customer(req: Request, res: Response, next: NextFunction): Promise<void>
    edit_customer(req: Request, res: Response, next: NextFunction): Promise<void>
    delete_customer(req: Request, res: Response, next: NextFunction): Promise<void>
}

export interface IcustomerControllerDependencies {
    customer_usecase: IcustomerUsecase;
}