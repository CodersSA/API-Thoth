import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { checkPassword, emailInDB } from '../services/user.service';
import err from "../constant/errors";
import ISignUp from '../interfaces/user/ISignUp';
import ISignIn from '../interfaces/user/ISignIn';
import { createToken } from '../helpers/jwt';

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