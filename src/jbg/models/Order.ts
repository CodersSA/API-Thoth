import { Document, model, Schema } from "mongoose";

export interface IOrder extends Document {
    idUser: string,
    status: string
    categories: Array<String>
};

const orderSchema = new Schema({
    idUser: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDING', 'PRICED', 'ACCEPTED', 'CLOSED']
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