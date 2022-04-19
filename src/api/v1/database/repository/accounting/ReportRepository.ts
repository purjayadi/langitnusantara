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
            attributes: ['name'],
            include: {
                model: Group,
                as: 'subGroup',
                attributes: ['name'],
                include: [
                    {
                        model: Account,
                        as: 'account',
                        attributes: ['id', 'name','posBalance',
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
                                where: {
                                    ...(filters?.periodeId && { periodeId: filters?.periodeId }),
                                }
                            },
                            {
                                attributes: [],
                                model: Journal,
                                as: 'journal',
                                required: true,
                                where: {
                                    ...(filters?.periodeId && { periodeId: filters?.periodeId }),
                                }
                            }
                        ]
                    }
                ]
            },
            where: {
                parentId: {
                    [Op.eq]: null
                }
            },
            group: ['Group.id', 'subGroup.id', 'subGroup->account.id']
        });
        Logger.info(groups);
        return  groups;
    }

    async BalanceSheet() {
            const groups = await Group.findAll({
                attributes: ['name'],
                include: {
                    model: Group,
                    as: 'subGroup',
                    attributes: ['name'],
                    include: [
                        {
                            model: Account,
                            as: 'account',
                            attributes: ['id', 'name','posBalance',
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
                                    required: true,
                                }
                            ]
                        }
                    ]
                },
                where: {
                    parentId: {
                        [Op.eq]: null
                    }
                },
                group: ['Group.id', 'subGroup.id', 'subGroup->account.id']
            });
            Logger.info(groups);
            return  groups;
        }

}

export default ReportRepository;