import IPurchase from "../model/purchase.interface";

export default interface IpurchaseRepository{
    create_purchase(purchaseData: IPurchase): Promise<IPurchase> 
    fetch_all_purchase(userId: string): Promise<IPurchase[]>
}