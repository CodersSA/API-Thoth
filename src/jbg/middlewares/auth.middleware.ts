import { NextFunction, Request, Response } from "express";
import err from "../constant/errors";

const emailValidator = (email: string): boolean => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(email);
};

export const signUpVerification = (req: Request, res: Response, next: NextFunction) => {
    const { body: { telf, email, password } } = req;

    if (typeof email == 'undefined' || typeof password == 'undefined' || typeof telf == 'undefined')
        return res.status(400).json({ msg: err.SIGNUP_DATA_MISSING });

    if (!(email.trim() && emailValidator(email) && password.trim() && telf.trim()))
        return res.status(400).json({ msg: err.SIGNUP_DATA_ERROR });

    next();
};

export const signInVerification = (req: Request, res: Response, next: NextFunction) => {
    const { body: { email, password } } = req;

    if (typeof email == 'undefined' || typeof password == 'undefined')
        return res.status(400).json({ msg: err.SIGNUP_DATA_MISSING });

    if (!(email.trim() && emailValidator(email) && password.trim()))
        return res.status(400).json({ msg: err.SIGNUP_DATA_ERROR });

    next();
};