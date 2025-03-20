
import Icustomer from "../model/customer.interface"
import IcustomerRepository from "../repository/customer_repository.interface"



export default interface IcustomerUsecase {
    getAllcustomers(userId:string): Promise<Icustomer[]>
    addcustomer(userId:string,customer: Icustomer): Promise<Icustomer>
    editcustomer(customerId: string, customer: Icustomer): Promise<Icustomer>
    deletecustomer(customerId: string): Promise<void>
}

export interface IcustomerUseCaseDepencies {
    repository: {
        customer_repository: IcustomerRepository
    }
}