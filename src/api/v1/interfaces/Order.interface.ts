import { Optional } from 'sequelize';

export interface IOrder{
    id?: string;
    packageId: string;
    noInvoice?: string;
    in : Date,
    out: Date,
    adult: number,
    children: number,
    userId: string,
    price: number,
    discount: number,
    amount: number,
    status?:  string;
    externalPaymentId?: string;
    payment?: {
        currency?: string;
        source: string;
        chanelCode: string;
        chanelCategory: string;
        successRedirectURL?: string;
    };
}

export interface IOrderDetail{
    id?: string;
    orderId: string;
    chanelCategory?: string;
    chanelCode?: string;
    externalId: string;
}
export interface OrderDetailInput extends Optional<IOrderDetail, 'id'> {}
export interface OrderInput extends Optional<IOrder, 'id'> {}
export interface OrderOutput extends Required<IOrder> {}
