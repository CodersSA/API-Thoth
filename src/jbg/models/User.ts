import { Document, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { encrypt } from "../helpers/bcrypt";

export interface IUser extends Document {
    email: string,
    password: string,
    telf: string
    comparePassword: (password: string) => Promise<boolean>
};

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    telf: {
        type: String,
        required: true,
    }
});

userSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    // New user
    const hash = await encrypt(user.password);
    user.password = hash;
    
    next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);