import { Document, model, Schema } from "mongoose";
import arrStatus from "../constant/orderStatus";

export interface IOrder extends Document {
    idUser: string,
    title: string,
    summary: string
    status: string
    categories: Array<string>
};

const orderSchema = new Schema({
    idUser: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: arrStatus,
        default: arrStatus[0]
    },
    categories: {
        type: Array,
    }
});

// orderSchema.pre<IOrder>('save', async function (next) {
//     const user = this;
//     if (!user.isModified("password")) return next();

//      New user
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(user.password, salt);
//     user.password = hash;
//     next();
// });

export default model<IOrder>("Order", orderSchema);