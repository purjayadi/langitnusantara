import { Optional } from 'sequelize';

export interface IAccount{
    id: string;
    name: string;
    code: string;
    groupId: string;
    isGroup: boolean;
    posReport: string;
    posBalance: string;
    isCash: boolean;
    parentId: string;
    userId: string;
    isActive: boolean;
    debit?: number;
    credit?: number;
    balance?: number;
}

export interface AccountInput extends Optional<IAccount, 'id'> {}
export interface AccountOutput extends Required<IAccount> {}