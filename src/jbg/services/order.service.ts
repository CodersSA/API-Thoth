import Order, { IOrder } from "../models/Order";

export const insertOrder = async (newOrder: IOrder, idUser: string): Promise<IOrder> => {
    
    newOrder.idUser = idUser
    await newOrder.save();

    return newOrder;
}