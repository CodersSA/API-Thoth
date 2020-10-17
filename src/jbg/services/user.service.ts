import User from '../models/User';
import { IUser } from '../models/User';
import { IProfile } from './../interfaces/user/IProfile';

export const emailInDB = async (email: string): Promise<IUser> => {

    const user = <IUser>await User.findOne({ email: email });

    return user;
};

export const checkPassword = async (userFound: IUser, password: string): Promise<boolean> => {

    const isValidPassword: boolean = await userFound.comparePassword(password);

    return isValidPassword;
};

export const getUserById = async (id: string): Promise<IUser> => {

    const userFound = <IUser>await User.findById(id);

    return userFound;
};

export const updatePassword = async (userFound: IUser, newPwd: string) => {

    userFound.password = newPwd;

    await userFound.save();

    return userFound;
};

export const updateProfile = async (userFound: IUser, updatedData: IProfile) => {

    const updatedUser: IUser = Object.assign(userFound, updatedData);

    await updatedUser.save();

    return updatedUser;
};