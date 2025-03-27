import { Types } from "mongoose";
import IProduct from "../../domain/interface/model/product.interface";
import IProductRepository from "../../domain/interface/repository/product_repository.interface";
import ProductModel from "../database/product.model";


export default class ProductRepository implements IProductRepository {

  async getAllProducts(userId: string): Promise<IProduct[]> {
    try {
      return await ProductModel.find({ userId }).sort({ _id: -1 });
    } catch (error) {
      throw new Error("Error fetching products: " + (error as Error).message);
    }
  }


  async createProduct(product: IProduct): Promise<IProduct> {
    try {
      return await ProductModel.create(product);
    } catch (error) {
      throw new Error("Error creating product: " + (error as Error).message);
    }
  }


  async updateProduct(id: string, product: Partial<IProduct>): Promise<IProduct | null> {
    try {
      return await ProductModel.findByIdAndUpdate(id, product, { new: true });
    } catch (error) {
      throw new Error("Error updating product: " + (error as Error).message);
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const deleted = await ProductModel.findByIdAndDelete(id);
      return deleted !== null;
    } catch (error) {
      throw new Error("Error deleting product: " + (error as Error).message);
    }
  }
  async updateQuantity(productId: Types.ObjectId, quantity: number): Promise<IProduct | null> {
    try {
      const product = await ProductModel.findByIdAndUpdate(productId,
        { $inc: { quantity: -quantity } }, { new: true })
      return product
    } catch (error) {
      throw error
    }
  }
}
