import IPurchase from "../../domain/interface/model/purchase.interface";
import IpurchaseRepository from "../../domain/interface/repository/purchase_repository.interface";
import PurchaseModel from "../database/purchase.model";


export default class PurchaseRepository implements IpurchaseRepository {
    async create_purchase(purchaseData: IPurchase): Promise<IPurchase> {
        try {
            const purchase = await PurchaseModel.create(purchaseData)
            return purchase
        } catch (error) {
            throw error
        }
    }

    async fetch_all_purchase(userId: string): Promise<IPurchase[]> {
        try {
            const purchases = await PurchaseModel.find({ userId })
                .sort({ date: -1 })
                .populate("customer", "name") 
                .populate("product", "name"); 

            return purchases;
            return purchases
        } catch (error) {
            throw error
        }
    }
}