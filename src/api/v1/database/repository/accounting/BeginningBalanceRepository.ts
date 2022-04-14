import BeginningBalance from '../../models/accounting/beginningBalance';
import { getAllDataFilters, paginate } from '../../../dto';
import { BeginningBalanceInput, BeginningBalanceOutput } from '../../../interfaces';
import { NotFoundError } from '../../../utils/not-found-error';

class BeginningBalanceRepository {
    async BeginningBalance(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allBeginningBalance = BeginningBalance.scope(['account', 'periode', 'user']).findAndCountAll({
                attributes: { exclude: ['accountId', 'periodeId', 'userId']},
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
                where: {
                    ...(filters?.isActive && { isActive: filters?.isActive })
                },
                raw: true
            });
            return allBeginningBalance;
    }

    async Create(payload: BeginningBalanceInput): Promise<BeginningBalanceOutput> {
        const beginningBalance = await BeginningBalance.create(payload);
        return beginningBalance;
    }

    async UpdateById(id: string, payload: Partial<BeginningBalanceInput>): Promise<BeginningBalanceOutput> {
        const beginningBalance = await BeginningBalance.findByPk(id);
        if (!beginningBalance) {
            // @todo throw custom error
            throw new NotFoundError();
        }
        const updatedBeginningBalance = await (beginningBalance as BeginningBalance).update(payload);
        return updatedBeginningBalance;
    }

    async DeleteById(id: string): Promise<boolean> {
        const beginningBalance = await BeginningBalance.findByPk(id);
        if (!beginningBalance) {
          // @todo throw custom error
            throw new NotFoundError();
        }
        const deleteBeginningBalance = await BeginningBalance.destroy({
            where: { id }
        });
        return !!deleteBeginningBalance;
    }

    async FindById(id: string): Promise<BeginningBalanceOutput> {
        const beginningBalance = await BeginningBalance.findByPk(id);
        if (!beginningBalance) {
          // @todo throw custom error
            throw new NotFoundError();
        }
        return beginningBalance;
    }
}

export default BeginningBalanceRepository;