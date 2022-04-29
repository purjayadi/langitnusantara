export interface ITrialBalance{
    id?: string;
    code: string;
    name: string;
    golongan: string;
    level: number;
    beginningBalance: string;
    debit: string;
    credit: string;
    balance: string;
    dataValues: ITrialBalance;
}