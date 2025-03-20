import { NextFunction, Request, Response } from "express"
import IproductUsecase from "../use_case/product_use_case.interface"

export default interface IproductController {
    get_product(req: Request, res: Response, next: NextFunction): Promise<void>
    add_product(req: Request, res: Response, next: NextFunction): Promise<void>
    edit_product(req: Request, res: Response, next: NextFunction): Promise<void>
    delete_product(req: Request, res: Response, next: NextFunction): Promise<void>
}

export interface IproductControllerDependencies {
    Product_usecase: IproductUsecase;
}