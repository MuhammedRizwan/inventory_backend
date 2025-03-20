import { Types } from "mongoose";

export default interface Icustomer {
    _id?: Types.ObjectId;
    userId:Types.ObjectId;
    name: string;
    email:string
    address: string;
    mobile: string;
}