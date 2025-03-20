import Icustomer from "../model/customer.interface";

export default interface IcustomerRepository {
  getAllcustomers(userId:string): Promise<Icustomer[]>;
  createcustomer(customer: Icustomer): Promise<Icustomer>;
  updatecustomer(id: string, customer: Partial<Icustomer>): Promise<Icustomer | null>;
  deletecustomer(id: string): Promise<boolean>;
}
