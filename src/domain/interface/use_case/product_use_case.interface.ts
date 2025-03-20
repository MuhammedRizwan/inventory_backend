import Iproduct from "../model/product.interface"
import IProductRepository from "../repository/product_repository.interface"


export default interface IproductUsecase {
    getAllProducts(userId:string): Promise<Iproduct[]>
    addProduct(userId:string,product: Iproduct): Promise<Iproduct>
    editProduct(productId: string, product: Iproduct): Promise<Iproduct>
    deleteProduct(productId: string): Promise<void>
}

export interface IproductUseCaseDepencies {
    repository: {
        product_repository: IProductRepository
    }
}