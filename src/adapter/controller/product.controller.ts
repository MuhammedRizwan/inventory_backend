import { NextFunction, Request, Response } from "express";
import status_code from "../../domain/constants/status_code";
import ApiResponse from "../../domain/interface/response/response";
import response_message from "../../domain/constants/response_message";
import IproductController, { IproductControllerDependencies } from "../../domain/interface/controller/product_controller.interface";
import IproductUsecase from "../../domain/interface/use_case/product_use_case.interface";



export default class ProductController  implements IproductController {
    private _product_usecase:IproductUsecase

    constructor(dependencies: IproductControllerDependencies) {
        this._product_usecase=dependencies.Product_usecase
    }

    async get_product(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {userId}=req.params
            const products = await this._product_usecase.getAllProducts(userId);
            res.
                status(status_code.OK).
                json(ApiResponse.successResponse(response_message.FETCH_PRODUCT_DATA, products));
        } catch (error) {
            next(error);
        }
    }

    async add_product(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, description, quantity, price } = req.body
            const {userId}=req.params
            if (!name || !description || !quantity || !price) {
                res
                    .status(status_code.BAD_REQUEST)
                    .json(ApiResponse.errorResponse("All fields are required", status_code.BAD_REQUEST));
                return
            }

            const product = await this._product_usecase.addProduct(userId,req.body);
            res.
                status(status_code.CREATED).
                json(ApiResponse.successResponse(response_message.PRODUCT_ADDED, product, status_code.CREATED));
        } catch (error) {
            next(error);
        }
    }

    async edit_product(req: Request, res: Response, next: NextFunction) :Promise<void>{
        try {
            const { productId } = req.params;
            const updatedProduct = await this._product_usecase.editProduct(productId, req.body);

            res
                .status(status_code.OK)
                .json(ApiResponse.successResponse(response_message.PRODUCT_UPDATED, updatedProduct));

        } catch (error) {
            next(error);
        }
    }

    async delete_product(req: Request, res: Response, next: NextFunction) :Promise<void> {
        try {
            const { productId } = req.params;
            await this._product_usecase.deleteProduct(productId);

            res
            .status(status_code.OK).json(ApiResponse.successResponse(response_message.PRODUCT_DELETED));
        } catch (error) {
            next(error);
        }
    }
}
