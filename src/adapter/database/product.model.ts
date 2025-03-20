import mongoose, { Schema} from "mongoose";
import Iproduct from "../../domain/interface/model/product.interface";


const ProductSchema = new Schema<Iproduct>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
},
    {
        timestamps: true
    });

const ProductModel = mongoose.model<Iproduct>("Product", ProductSchema);

export default ProductModel;
