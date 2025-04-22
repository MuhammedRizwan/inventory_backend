import IProduct from "../../domain/interface/model/product.interface";
import IProductUseCase, { IproductUseCaseDepencies } from "../../domain/interface/use_case/product_use_case.interface";
import AppError from "../../domain/error/app_error";
import status_code from "../../domain/constants/status_code";
import response_message from "../../domain/constants/response_message";
import IProductRepository from "../../domain/interface/repository/product_repository.interface";
import { Types } from "mongoose";


export default class ProductUsecase implements IProductUseCase {
    private _productRepository: IProductRepository;

    constructor(dependencies: IproductUseCaseDepencies) {
        this._productRepository = dependencies.repository.product_repository;
    }

    async getAllProducts(userId:string): Promise<IProduct[]> {
        try {
            const products = await this._productRepository.getAllProducts(userId);
            if (!products) {
                throw new AppError(status_code.BAD_REQUEST, response_message.PRODUCT_FETCH_ERROR)
            }
            return products
        } catch (error) {
            throw error
        }
    }

    async addProduct(userId: string, product: IProduct): Promise<IProduct> {
        try {
            product.userId = new Types.ObjectId(userId);
            const productData = await this._productRepository.createProduct(product);
            if (!productData) {
                throw new AppError(status_code.BAD_REQUEST, response_message.PRODUCT_ADD_ERROR)
            }
            return productData
        } catch (error) {
            throw error
        }
    }

    async editProduct(productId: string, product: Partial<IProduct>): Promise<IProduct> {
        try {
            const updatedProduct = await this._productRepository.updateProduct(productId, product);
            if (!updatedProduct) {
                throw new AppError(status_code.BAD_REQUEST, response_message.PRODUCT_EDIT_ERROR)
            }
            return updatedProduct;
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(productId: string): Promise<void> {
        try {
            const deleted = await this._productRepository.deleteProduct(productId);
            if (!deleted) {
                throw new AppError(status_code.BAD_REQUEST, response_message.PRODUCT_DELETE_ERROR)
            }
        } catch (error) {
            throw error
        }
    }
}
