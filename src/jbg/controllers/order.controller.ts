import { Request, Response } from "express";
import { INewOrder } from "../interfaces/order/INewOrder";
import Order, { IOrder } from "../models/Order";
import { insertOrder } from "../services/order.service";
import err from "../constant/errors"
import { getIdFromPayload } from "../helpers/jwt";

export const createOrder = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { body } : { body: INewOrder} = req;
        const order: IOrder = new Order(body)

        // Get id from jwt token
        const idUser: string = getIdFromPayload(<string>req.headers.authorization);
        if (!idUser)
            throw new Error(err.INVALID_TOKEN);

        const orderSaved: IOrder = await insertOrder(order, idUser);
        if (!orderSaved)
            throw new Error(err.DATABASE_ERROR);

        return res.status(201).json({msg: orderSaved})
    } catch (e) {
        return res.status(400).json({ msg: e.message }) 
    }
};