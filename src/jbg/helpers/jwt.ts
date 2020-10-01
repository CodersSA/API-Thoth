import jwt from "jsonwebtoken";
import config from "../../config/config";
import { IUser } from '../models/User';

export const createToken = (user: IUser) => {
    return jwt.sign({ id: user.id, email: user.email }, config.JWT_SECRET, { expiresIn: 86400 });
};