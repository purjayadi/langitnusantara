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
                                attributes: ['id', 'name', 'posBalance',
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
            raw: true,
            nest: true,
            group: ['Group.id', 'subGroup.id', 'subGroup->subGroup.id', 'subGroup->subGroup->account.id']
        });
        return groups;
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
                                attributes: ['id', 'name', 'posBalance',
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
            raw: true,
            nest: true,
            group: ['Group.id', 'subGroup.id', 'subGroup->subGroup.id', 'subGroup->subGroup->account.id']
        });
        Logger.info(groups);
        return groups;
    }

}

export default ReportRepository;