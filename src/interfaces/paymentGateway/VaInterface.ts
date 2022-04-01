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

export interface VaInput extends Optional<IVa, 'id'> {}
export interface VaOutput extends Required<IVa> {}