import User from '../models/User';
import { IUser } from '../models/User';

export const emailInDB = async (email: string): Promise<IUser> => {

    const user = <IUser>await User.findOne({ email: email });

    return user;
};

export const checkPassword = async (userFound: IUser, password: string): Promise<boolean> => {

    const isValidPassword: boolean = await userFound.comparePassword(password);

    return isValidPassword;
};