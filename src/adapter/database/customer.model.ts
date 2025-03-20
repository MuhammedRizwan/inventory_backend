
import mongoose, { Schema, Types } from "mongoose";
import Icustomer from "../../domain/interface/model/customer.interface";

const CustomerSchema= new Schema<Icustomer>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        address: { type: String, required: true },
        mobile: { type: String, required: true },
    },
    {
        timestamps: true, 
    }
);

const customerModel= mongoose.model<Icustomer>("Customer", CustomerSchema);

export default customerModel;