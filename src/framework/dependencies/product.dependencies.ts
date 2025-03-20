import ProductRepository from "../../adapter/repository/product.repository";
import ProductUsecase from "../../application/product/product.use_case";
import { IproductControllerDependencies } from "../../domain/interface/controller/product_controller.interface";



const repository = { product_repository:new ProductRepository() }


const usecase={Product_usecase:new ProductUsecase({repository})}


const productDependencies: IproductControllerDependencies = usecase ;

export default productDependencies