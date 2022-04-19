import Journal from '../../models/accounting/Journal';
import { getAllDataFilters, paginate } from '../../../dto';
import Tag from '../../models/accounting/tag';
import Account from '../../models/accounting/account';
import { Op } from 'sequelize';
import BeginningBalance from '../../models/accounting/beginningBalance';

class LedgerRepository {
    async Ledger(filters?: getAllDataFilters
    ): Promise<paginate> {
        let balance: number = 0;
        const limit = filters?.limit ? +filters?.limit : 10;
        const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
        const { rows, count } = await Journal.findAndCountAll({
            attributes: ['accountId', 'code', 'date', 'debit', 'credit', 'note', 'ref'],
            include: [
                { model: Tag, as: 'tag', attributes: ['name'] },
                { model: Account, as: 'account', attributes: ['name', 'posBalance'] }
            ],
            ...filters?.page && { offset: offset },
            ...filters?.limit && { limit: limit },
            where: {
                ...(filters?.accountId && { accountId: filters?.accountId }),
                ...(filters?.startDate && { date: { [Op.gte] : filters?.startDate} }),
                ...(filters?.endDate && { date: { [Op.lte] : filters?.endDate} }),
            }
        });
        let data: any[] = [];
        const account = await Account.findByPk(filters?.accountId);
        if (account) {
            const bb = await BeginningBalance.scope('periode').findOne({
                where: { 
                    accountId: account.id
                }
            });
            if (bb) {
                data.push({
                    date: bb.periode.startDate,
                    account: account.name,
                    tag: '-',
                    code: account.code,
                    debit: bb.bbDebit,
                    credit: bb.bbCredit,
                    note: 'Saldo awal periode ' + bb.periode.startDate + '-' + bb.periode.endDate,
                    ref: '-',
                    balance: balance,
                });
            }
            rows.map((row) => {
                if (account.posBalance === 'Debit') {
                    balance += row.debit - row.credit;
                    data.push({
                        date: row.date,
                        account: row.account.name,
                        tag: row.tag.name,
                        code: row.code,
                        debit: row.debit,
                        credit: row.credit,
                        note: row.note,
                        ref: row.ref,
                        balance: balance,
                    });
                } else {
                    balance += row.credit - row.debit;
                    data.push({
                        date: row.date,
                        account: row.account.name,
                        tag: row.tag.name,
                        code: row.code,
                        debit: row.debit,
                        credit: row.credit,
                        note: row.note,
                        ref: row.ref,
                        balance: balance,
                    });
                }
            });
        } else {
            throw new Error('Account not found, please select other account');
        }
        return {
            rows: data,
            count: count
        };
    }

}

export default LedgerRepository;