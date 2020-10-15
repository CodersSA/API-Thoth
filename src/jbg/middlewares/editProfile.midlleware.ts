import { NextFunction, Request, Response } from "express";
import err from "../constant/errors";
import IUpdatePassword from './../interfaces/user/IUpdatePassword';

export const checkPasswordChangeRequest = (req: Request, res: Response, next: NextFunction) => {
    
    const {oldPwd, newPwd}: IUpdatePassword = req.body;

    if (!oldPwd.trim() || !newPwd.trim())
        return res.status(400).json({msg: err.REQUIRED_DATA_MISSING });

    next();
    
};