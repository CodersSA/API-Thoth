import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { checkPassword, emailInDB } from '../services/user.service';
import err from "../constant/errors";
import ISignUp from '../interfaces/user/ISignUp';
import ISignIn from '../interfaces/user/ISignIn';
import { createToken, getIdFromPayload } from '../helpers/jwt';
import IUpdatePassword from './../interfaces/user/IUpdatePassword';
import { getUserById, updatePassword, updateProfile } from './../services/user.service';
import { use } from "passport";
import { IProfile } from './../interfaces/user/IProfile';

// Register
export const signUp = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { body }: { body: ISignUp } = req;

        const userFound: IUser = await emailInDB(body.email);
        if (userFound)
            throw new Error(err.SIGNUP_EMAIL_REGISTERED);

        const newUser = new User(body);
        await newUser.save();

        return res.status(201).json(newUser);

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
};

// Login
export const signIn = async (req: Request, res: Response): Promise<Response> => {

    try {
        const { body }: { body: ISignIn } = req;

        const userFound: IUser = await emailInDB(body.email);
        if (!userFound)
            throw new Error(err.SIGNIN_CREDENTIALS_ERROR);

        const isMatch: boolean = await checkPassword(userFound, body.password);
        if (!isMatch)
            throw new Error(err.SIGNIN_CREDENTIALS_ERROR);

        const userToken: string = createToken(userFound);

        return res.status(200).json({ token: userToken });

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
};

//Change Password
export const changePassword = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { body }: { body: IUpdatePassword } = req;

        // Get id from jwt token
        const id: string = getIdFromPayload(<string>req.headers.authorization);
        if (!id)
            throw new Error(err.INVALID_TOKEN);

        // Get user's data ()
        //! Falta filtro de salida
        const userFound: IUser = await getUserById(id);
        if (!userFound)
            throw new Error(err.REQUIRED_DATA_MISSING);

        // Is Password correct?
        const isMatch: boolean = await checkPassword(userFound, body.oldPwd);
        if (!isMatch)
            throw new Error(err.REQUIRED_DATA_MISSING);

        const updatedUser = await updatePassword(userFound, body.newPwd);
        if (!updatedUser)
            throw new Error(err.DATABASE_ERROR);

        return res.status(200).json(updatedUser);
    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
};

export const changeProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { telf, email }: IProfile = req.body;

        // Get id from jwt token
        const id: string = getIdFromPayload(<string>req.headers.authorization);
        if (!id)
            throw new Error(err.INVALID_TOKEN);

        // Get user's data
        const userFound: IUser = await getUserById(id);
        if (!userFound)
            throw new Error(err.REQUIRED_DATA_MISSING);

        const updatedUser: IUser = await updateProfile(userFound, { telf: telf, email: email });
        if (!updatedUser)
            throw new Error(err.DATABASE_ERROR);

        return res.status(200).json({ msg: "Successfully updated." });

    } catch (e) {
        return res.status(400).json({ msg: e.message });
    }
};