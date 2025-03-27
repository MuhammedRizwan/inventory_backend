import IPurchase from "../model/purchase.interface"
import IProductRepository from "../repository/product_repository.interface"
import IpurchaseRepository from "../repository/purchase_repository.interface"

export default interface IpurchaseUsecase {
    add_purchase(purchaseData: IPurchase): Promise<IPurchase>;
    fetch_purchase(userId:string): Promise<IPurchase[]>;
}

export interface IpurchaseUseCaseDepencies {
    repository: {
        purchase_repository: IpurchaseRepository
        product_repository: IProductRepository
    }
}