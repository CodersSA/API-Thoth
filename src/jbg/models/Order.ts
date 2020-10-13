import { Document, model, Schema } from "mongoose";

export interface IOrder extends Document {
    categories: Array<String>
    status: String
}

const orderSchema = new Schema({
    categories: {
        type: Array,

    },
    status: {
        type: String,
        enum: ['STANDBY', 'PENDING', 'ACCEPTED', 'ARCHIVED'],
        required: true,
    }
});

export default model<IOrder>("Order", orderSchema);