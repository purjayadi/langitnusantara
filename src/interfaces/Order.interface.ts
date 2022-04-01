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
    status?: string
}

export interface OrderInput extends Optional<IOrder, 'id'> {}
export interface OrderOutput extends Required<IOrder> {}
