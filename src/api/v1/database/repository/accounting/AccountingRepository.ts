import Account from '../../models/accounting/account';
import { getAllDataFilters, paginate } from '../../../dto';
import { AccountInput, AccountOutput } from '../../../interfaces';
import { NotFoundError } from '../../../utils/not-found-error';
import BeginningBalance from '../../models/accounting/beginningBalance';
import db from '../../../config/db';
import Group from '../../models/accounting/group';
import User from '../../models/user';

class AccountRepository {
    async Account(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allAccount = Account.findAndCountAll({
                attributes: { exclude: ['groupId', 'parentId', 'userId']},
                include: [
                    { model: Group, as: 'group', attributes: ['name'] }, 
                    { model: User, as: 'user', attributes: ['firstName','lastName']}
                ],
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
                where: {
                    ...(filters?.isActive && { isActive: filters?.isActive })
                }
            });
            return allAccount;
    }

    async Create(payload: AccountInput, periode: any): Promise<AccountOutput> {
        const t = await db.transaction();
        try {
            const account = await Account.create(payload, { transaction: t });
            // insert beginning balance after insert account
            await BeginningBalance.create({
                accountId: account.id,
                bbDebit: 0,
                bbCredit: 0,
                balance: 0,
                userId: account.userId,
                periodeId: periode.id,
            }, { transaction: t });
            await t.commit();
            return account;
        } catch (error) {
            await t.rollback();
            throw error;
        }
        
    }

    async UpdateById(id: string, payload: Partial<AccountInput>): Promise<AccountOutput> {
        const account = await Account.findByPk(id);
        if (!account) {
            // @todo throw custom error
            throw new NotFoundError();
        }
        const updatedAccount = await (account as Account).update(payload);
        return updatedAccount;
    }

    async DeleteById(id: string): Promise<boolean> {
        const account = await Account.findByPk(id);
        if (!account) {
          // @todo throw custom error
            throw new NotFoundError();
        }
        const deleteAccount = await Account.destroy({
            where: { id }
        });
        return !!deleteAccount;
    }

    async FindById(id: string): Promise<AccountOutput> {
        const account = await Account.findByPk(id);
        if (!account) {
          // @todo throw custom error
            throw new NotFoundError();
        }
        return account;
    }
}

export default AccountRepository;