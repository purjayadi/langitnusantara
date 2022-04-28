import { getAllDataFilters } from '../../../dto';
import Group from '../../models/accounting/group';
import { Op, Sequelize } from 'sequelize';
import Logger from '../../../utils/logger';
import Account from '../../models/accounting/account';
import Journal from '../../models/accounting/Journal';
import BeginningBalance from '../../models/accounting/beginningBalance';

class ReportRepository {
    // eslint-disable-next-line no-unused-vars
    async TrialBalance(filters?: getAllDataFilters
    ) {
        const groups = await Group.findAll({
            attributes: ['code', 'name'],
            where: {
                '$Group.parentId$': {
                    [Op.eq]: null
                }
            },
            include: {
                model: Group,
                as: 'subGroup',
                required: false,
                attributes: ['code', 'name'],
                include: [
                    {
                        model: Group,
                        as: 'subGroup',
                        required: false,
                        attributes: ['code', 'name'],
                        include: [
                            {
                                model: Account,
                                as: 'account',
                                required: false,
                                attributes: ['id', 'code', 'name', 'posBalance',
                                    [Sequelize.fn('SUM', Sequelize.col('balance')), 'beginningBalance'],
                                    [Sequelize.fn('SUM', Sequelize.col('debit')), 'debit'],
                                    [Sequelize.fn('SUM', Sequelize.col('credit')), 'credit'],
                                    // eslint-disable-next-line quotes
                                    [Sequelize.literal(`(case when "posBalance" = 'Debit' then SUM(debit) - SUM(credit) else SUM(credit) - SUM(debit) end)`), 'balance'],
                                ],
                                include: [
                                    {
                                        model: BeginningBalance,
                                        as: 'beginningBalances',
                                        attributes: [],
                                        required: false,
                                        where: {
                                            ...(filters?.periodeId && { periodeId: filters?.periodeId }),
                                        }
                                    },
                                    {
                                        attributes: [],
                                        model: Journal,
                                        as: 'journal',
                                        required: false,
                                        // required: true,
                                        where: {
                                            ...(filters?.periodeId && { periodeId: filters?.periodeId }),
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            order: [
                ['code', 'ASC'],
                [{ model: Group, as: 'subGroup' }, { model: Group, as: 'subGroup' }, 'code', 'ASC'],
            ],
            group: ['Group.id', 'subGroup.id', 'subGroup->subGroup.id', 'subGroup->subGroup->account.id']
        });
        let data: any = [];
        groups.forEach((group: any) => {
            data.push({
                code: group.code,
                name: group.name,
                golongan: 'Group',
                level: 1,
                beginningBalance: 0,
                debit: 0,
                credit: 0,
                balance: 0,
            });
            group.subGroup.forEach((subGroup: any) => {
                data.push({
                    code: subGroup.code,
                    name: subGroup.name,
                    golongan: 'Group',
                    level: 2,
                    beginningBalance: 0,
                    debit: 0,
                    credit: 0,
                    balance: 0,
                });
                subGroup.subGroup.forEach((subSubGroup: any) => {
                    data.push({
                        code: subSubGroup.code,
                        name: subSubGroup.name,
                        golongan: 'Group',
                        level: 3,
                        beginningBalance: 0,
                        debit: 0,
                        credit: 0,
                        balance: 0,
                    });
                    subSubGroup.account.forEach((account: any) => {
                        Logger.debug(account);

                        data.push({
                            code: account.code,
                            name: account.name,
                            golongan: 'Ledger',
                            level: 4,
                            beginningBalance: account.beginningBalance ? account.beginningBalance : 0,
                            debit: account.debit ? account.debit : 0,
                            credit: account.credit ? account.credit : 0,
                            balance: account.balance ? account.balance : 0,
                        });
                    });

                });
            });
        });
        return data;
    }

    async BalanceSheet() {
        const groups = await Group.findAll({
            attributes: ['code', 'name'],
            where: {
                '$Group.parentId$': {
                    [Op.eq]: null
                }
            },
            include: {
                model: Group,
                as: 'subGroup',
                required: false,
                attributes: ['code', 'name'],
                include: [
                    {
                        model: Group,
                        as: 'subGroup',
                        required: false,
                        attributes: ['code', 'name'],
                        include: [
                            {
                                model: Account,
                                as: 'account',
                                required: false,
                                attributes: ['id', 'code', 'name', 'posBalance',
                                    // eslint-disable-next-line quotes
                                    [Sequelize.literal(`(case when "posBalance" = 'Debit' then SUM(debit) - SUM(credit) else SUM(credit) - SUM(debit) end)`), 'balance'],
                                ],
                                where: {
                                    posBalance: 'Debit'
                                },
                                include: [
                                    {
                                        model: BeginningBalance,
                                        as: 'beginningBalances',
                                        attributes: [],
                                    },
                                    {
                                        attributes: [],
                                        model: Journal,
                                        as: 'journal',
                                        required: false,
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            order: [
                ['code', 'ASC'],
                [{ model: Group, as: 'subGroup' }, { model: Group, as: 'subGroup' }, 'code', 'ASC'],
            ],
            group: ['Group.id', 'subGroup.id', 'subGroup->subGroup.id', 'subGroup->subGroup->account.id']
        });
        let data: any = [];
        groups.forEach((group: any) => {
            data.push({
                code: group.code,
                name: group.name,
                golongan: 'Group',
                level: 1,
                balance: 0,
            });
            group.subGroup.forEach((subGroup: any) => {
                data.push({
                    code: subGroup.code,
                    name: subGroup.name,
                    golongan: 'Group',
                    level: 2,
                    balance: 0,
                });
                subGroup.subGroup.forEach((subSubGroup: any) => {
                    data.push({
                        code: subSubGroup.code,
                        name: subSubGroup.name,
                        golongan: 'Group',
                        level: 3,
                        balance: 0,
                    });
                    subSubGroup.account.forEach((account: any) => {
                        data.push({
                            code: account.code,
                            name: account.name,
                            golongan: 'Ledger',
                            level: 4,
                            balance: account.balance ? account.balance : 0,
                        });
                    });
                });
            });
        });
        Logger.info(groups);
        return data;
    }

}

export default ReportRepository;