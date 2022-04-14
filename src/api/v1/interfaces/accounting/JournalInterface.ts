import { Optional } from 'sequelize';

export interface IJournalType{
    id: string;
    name: string;
    code: string;
    note: string;
    isActive: boolean;
}

export interface JournalTypeInput extends Optional<IJournalType, 'id'> {}
export interface JournalTypeOutput extends Required<IJournalType> {}

// make interface journal

export interface IJournal{
    id: string;
    date: Date;
    code: string;
    accountId: string;
    journalTypeId: string;
    periodeId: string;
    debit: number;
    credit: number;
    note: string;
    userId: string;
    tagId: string;
    ref: string;
    reduce?: (any);
    map?: (any);
}

export interface JournalInput extends Optional<IJournal, 'id'> {}
export interface JournalOutput extends Required<IJournal> {}

// make interface tags

export interface ITag{
    id: string;
    code: string;
    name: string;
    bgColor: string;
    txtColor: string;
    isActive: boolean;
}

export interface TagInput extends Optional<ITag, 'id'> {}
export interface TagOutput extends Required<ITag> {}

export interface ITax{
    id: string;
    code: string;
    name: string;
    percentage: string;
    accountTaxPurchase: string;
    accountTaxSales: string;
    isActive: boolean;
}

export interface TaxInput extends Optional<ITax, 'id'> {}
export interface TaxOutput extends Required<ITax> {}