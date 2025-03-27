import { NextFunction, Request, Response } from "express"
import IpurchaseUsecase from "../use_case/purchase_use_case.intrface";

export default interface IpurchaseController {
    add_purchase(req: Request, res: Response, next: NextFunction): Promise<void>
    fetch_purchase(req: Request, res: Response, next: NextFunction): Promise<void>  
}

export interface IpurchaseControllerDependencies {
    Purchase_usecase: IpurchaseUsecase;
}