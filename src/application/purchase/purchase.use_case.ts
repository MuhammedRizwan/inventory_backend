import response_message from "../../domain/constants/response_message";
import status_code from "../../domain/constants/status_code";
import AppError from "../../domain/error/app_error";
import IPurchase from "../../domain/interface/model/purchase.interface";
import IProductRepository from "../../domain/interface/repository/product_repository.interface";
import IpurchaseRepository from "../../domain/interface/repository/purchase_repository.interface";
import IpurchaseUsecase, { IpurchaseUseCaseDepencies } from "../../domain/interface/use_case/purchase_use_case.intrface";


export default class PurchaseUsecase implements IpurchaseUsecase{
    private _purchaseRepository: IpurchaseRepository
    private _productRepository:IProductRepository
    constructor(dependencies: IpurchaseUseCaseDepencies) {
        this._purchaseRepository=dependencies.repository.purchase_repository
        this._productRepository=dependencies.repository.product_repository
    }

    async add_purchase(purchaseData: IPurchase): Promise<IPurchase> {
        try {
            const purchase=await this._purchaseRepository.create_purchase(purchaseData)
            if(!purchase){
                throw new AppError(status_code.BAD_REQUEST,response_message.PURCHASE_ADD_ERROR)
            }
            const {product,quantity}=purchase
            const updateProduct=this._productRepository.updateQuantity(product,quantity)
            if(!updateProduct){
                throw new AppError(status_code.INTERNAL_SERVER_ERROR,response_message.QUANTITY_UPDATE_ERROR)
            }
            return purchase
        } catch (error) {
            throw error
        }
    }
    async fetch_purchase(userId:string): Promise<IPurchase[]> {
        try {
            const purchases=await this._purchaseRepository.fetch_all_purchase(userId)
            console.log(purchases)
            if(!purchases){
                throw new AppError(status_code.BAD_REQUEST,response_message.FETCH_ALL_PURCHASE_ERROR)
            }
            return purchases
        } catch (error) {
            throw error
        }
    }
} 