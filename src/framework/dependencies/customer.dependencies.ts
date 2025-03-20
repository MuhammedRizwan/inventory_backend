import CustomerRepository from "../../adapter/repository/customer.repository";
import CustomerUsecase from "../../application/customer/customer.use_case";
import { IcustomerControllerDependencies } from "../../domain/interface/controller/customer_controller.interface";


const repository = { customer_repository:new CustomerRepository() }


const usecase={customer_usecase:new CustomerUsecase({repository})}


const customerDependencies: IcustomerControllerDependencies = usecase ;

export default customerDependencies