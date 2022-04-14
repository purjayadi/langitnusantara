import { Optional } from 'sequelize';

export interface IBeginningBalance{
    id: string;
    accountId: string;
    debit: number;
    credit: number;
    balance: number;
    userId: string;
    periodeId: string;
}

export interface BeginningBalanceInput extends Optional<IBeginningBalance, 'id'> {}
export interface BeginningBalanceOutput extends Required<IBeginningBalance> {}