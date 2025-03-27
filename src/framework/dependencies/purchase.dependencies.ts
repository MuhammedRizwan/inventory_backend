import ProductRepository from "../../adapter/repository/product.repository";
import PurchaseRepository from "../../adapter/repository/purchase.repository";
import PurchaseUsecase from "../../application/purchase/purchase.use_case";
import { IpurchaseControllerDependencies } from "../../domain/interface/controller/purchase_controller.interface";


const repository = {purchase_repository:new PurchaseRepository(),product_repository:new ProductRepository()}

const usecase={Purchase_usecase:new PurchaseUsecase({repository})}


const purchaseDependencies: IpurchaseControllerDependencies = usecase ;

export default purchaseDependencies