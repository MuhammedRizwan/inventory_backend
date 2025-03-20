import Icustomer from "../../domain/interface/model/customer.interface";
import IcustomerRepository from "../../domain/interface/repository/customer_repository.interface";
import customerModel from "../database/customer.model";



export default class CustomerRepository implements IcustomerRepository {

  async getAllcustomers(userId:string): Promise<Icustomer[]> {
    try {
      return await customerModel.find({userId}).sort({_id:-1});
    } catch (error) {
      throw new Error("Error fetching customers: " + (error as Error).message);
    }
  }


  async createcustomer(customer: Icustomer): Promise<Icustomer> {
    try {
      return await customerModel.create(customer);
    } catch (error) {
      throw new Error("Error creating customer: " + (error as Error).message);
    }
  }


  async updatecustomer(id: string, customer: Partial<Icustomer>): Promise<Icustomer | null> {
    try {
      return await customerModel.findByIdAndUpdate(id, customer, { new: true });
    } catch (error) {
      throw new Error("Error updating customer: " + (error as Error).message);
    }
  }

  async deletecustomer(id: string): Promise<boolean> {
    try {
      const deleted = await customerModel.findByIdAndDelete(id);
      return deleted !== null;
    } catch (error) {
      throw new Error("Error deleting customer: " + (error as Error).message);
    }
  }
}
