import AppError from "../../domain/error/app_error";
import status_code from "../../domain/constants/status_code";
import response_message from "../../domain/constants/response_message";
import { Types } from "mongoose";
import IcustomerRepository from "../../domain/interface/repository/customer_repository.interface";
import IcustomerUsecase, { IcustomerUseCaseDepencies } from "../../domain/interface/use_case/customer_use_case.interface";
import Icustomer from "../../domain/interface/model/customer.interface";


export default class CustomerUsecase implements IcustomerUsecase {
    private _customerRepository: IcustomerRepository;

    constructor(dependencies: IcustomerUseCaseDepencies) {
        this._customerRepository = dependencies.repository.customer_repository;
    }

    async getAllcustomers(userId:string): Promise<Icustomer[]> {
        try {
            const customers = await this._customerRepository.getAllcustomers(userId);
            if (!customers) {
                throw new AppError(status_code.BAD_REQUEST, response_message.CUSTOMER_FETCH_ERROR)
            }
            return customers
        } catch (error) {
            throw error
        }
    }

    async addcustomer(userId: string, customer: Icustomer): Promise<Icustomer> {
        try {
            customer.userId = new Types.ObjectId(userId);
            const customerData = await this._customerRepository.createcustomer(customer);
            if (!customerData) {
                throw new AppError(status_code.BAD_REQUEST, response_message.CUSTOMER_ADD_ERROR)
            }
            return customerData
        } catch (error) {
            throw error
        }
    }

    async editcustomer(customerId: string, customer: Partial<Icustomer>): Promise<Icustomer> {
        try {
            console.log(customer)
            const updatedcustomer = await this._customerRepository.updatecustomer(customerId, customer);
            if (!updatedcustomer) {
                throw new AppError(status_code.BAD_REQUEST, response_message.CUSTOMER_EDIT_ERROR)
            }
            return updatedcustomer;
        } catch (error) {
            throw error
        }
    }

    async deletecustomer(customerId: string): Promise<void> {
        try {
            const deleted = await this._customerRepository.deletecustomer(customerId);
            if (!deleted) {
                throw new AppError(status_code.BAD_REQUEST, response_message.CUSTOMER_DELETE_ERROR)
            }
        } catch (error) {
            throw error
        }
    }
}
