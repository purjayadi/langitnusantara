import { Optional } from 'sequelize';

export interface IPaymentChanel{
    id: string;
    name: string;
    chanelCode: string;
    chanelCategory: string;
    logo: string;
    isActive: boolean;
}

export interface PaymentChanelInput extends Optional<IPaymentChanel, 'id'> {}
export interface PaymentChanelOutput extends Required<IPaymentChanel> {}

export interface IOrderPayment{
    id: string;
    source?: string;
    externalId?: string;
    orderId: string;
    chanelCode: string;
    accountNumber?: string;
    amount: number;
}

export interface OrderPaymentInput extends Optional<IOrderPayment, 'id'> {}
export interface OrderPaymentOutput extends Required<IOrderPayment> {}