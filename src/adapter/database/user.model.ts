import { Schema, model } from "mongoose";
import IUser from "../../domain/interface/model/user.interface";


const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, minlength: 2 },  
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    is_verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUser>("User", userSchema);
export default UserModel;
