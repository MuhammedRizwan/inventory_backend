import { NextFunction, Request, Response } from "express";
import IpurchaseUsecase from "../../domain/interface/use_case/purchase_use_case.intrface";
import IpurchaseController, { IpurchaseControllerDependencies } from "../../domain/interface/controller/purchase_controller.interface";
import status_code from "../../domain/constants/status_code";
import ApiResponse from "../../domain/interface/response/response";
import response_message from "../../domain/constants/response_message";


export default class PurchaseController implements IpurchaseController {
    private _purchase_usecase: IpurchaseUsecase
    constructor(dependencies: IpurchaseControllerDependencies) {
        this._purchase_usecase = dependencies.Purchase_usecase
    }
    async add_purchase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const purchaseData = req.body
            console.log(purchaseData,"data")
            const purchase = this._purchase_usecase.add_purchase(purchaseData)
            res.
                status(status_code.OK).
                json(ApiResponse.successResponse(response_message.PURCHASE_ADDED, purchase));
        } catch (error) {
            next(error)
        }
    }
    async fetch_purchase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {userId}= req.params
            const purchaseList =await this._purchase_usecase.fetch_purchase(userId)
            res.
                status(status_code.OK).
                json(ApiResponse.successResponse(response_message.FETCH_ALL_PURCHASE,purchaseList));
        } catch (error) {
           next(error)
        }
    }
}