import IProduct from "../model/product.interface";

export default interface IProductRepository {
  getAllProducts(userId:string): Promise<IProduct[]>;
  createProduct(product: IProduct): Promise<IProduct>;
  updateProduct(id: string, product: Partial<IProduct>): Promise<IProduct | null>;
  deleteProduct(id: string): Promise<boolean>;
}
