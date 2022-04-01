import { Optional } from 'sequelize';

export interface ITransaction{
    id?: string;
    types?: Array<string>;
    statuses?: Array<string>;
    channelCategories?: Array<string>;
    referenceId?: string;
    productId?: string;
    accountIdentifier?: string;
    currency?: string;
    amount?: number;
    limit?: number;
    afterId?: string;
    beforeId?: string;
    createdDateFrom?: Date;
    createdDateTo?: Date;
    updatedDateFrom?: Date;
    updatedDateTo?: Date;
}

export interface TransactionInput extends Optional<ITransaction, 'id'> {}
export interface TransactionOutput extends Required<ITransaction> {}