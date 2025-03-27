import { Types } from "mongoose";

export default interface IPurchase extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    date: Date;
    customer: Types.ObjectId;
    product: Types.ObjectId;
    price: number;
    quantity: number;
    payment: "Cash" | "Bank";
    createdAt?: Date;
    updatedAt?: Date;
}