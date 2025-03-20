import { Types } from "mongoose";

export default interface IProduct {
  _id?: Types.ObjectId; 
  userId: Types.ObjectId; 
  name: string;
  description: string;
  quantity: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
