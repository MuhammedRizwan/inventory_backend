import { Schema, Document, model } from "mongoose";
import IPurchase from "../../domain/interface/model/purchase.interface";


const purchaseSchema = new Schema<IPurchase>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  product:{ type: Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  payment: { type: String, enum: ["Cash", "Bank"], required: true },
});


const PurchaseModel = model<IPurchase>("Purchase", purchaseSchema);
export default PurchaseModel;
