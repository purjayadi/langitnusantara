import { Optional } from 'sequelize';

export interface IVa{
    id?: string;
    externalID: string;
    name: string;
    bankCode: string;
    isClosed: boolean;
    suggestedAmt: number;
    expectedAmt: number;
}

export interface IVirtualAccount{
    id?: string;
    status: string;
    externalId: string;
    orderId: string;
    expectedAmount: number;
    bankCode: string;
    accountNumber: string;
}

export interface VaInput extends Optional<IVa, 'id'> {}
export interface VirtualAccountInput extends Optional<IVa, 'id'> {}
export interface VaOutput extends Required<IVa> {}