import Tax from '../../models/accounting/tax';
import { getAllDataFilters, paginate } from '../../../dto';
import { TaxInput, TaxOutput } from '../../../interfaces';
import { NotFoundError } from '../../../utils/not-found-error';

class TaxRepository {
    async Tax(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allTax = Tax.findAndCountAll({
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
                where: {
                    ...(filters?.isActive && { isActive: filters?.isActive })
                }
            });
            return allTax;
    }

    async Create(payload: TaxInput): Promise<TaxOutput> {
        const tax = await Tax.create(payload);
        return tax;
    }

    async UpdateById(id: string, payload: Partial<TaxInput>): Promise<TaxOutput> {
        const tax = await Tax.findByPk(id);
        if (!tax) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedTax = await (tax as Tax).update(payload);
        return updatedTax;
    }

    async DeleteById(id: string): Promise<boolean> {
        const tax = await Tax.findByPk(id);
        if (!tax) {
          // @todo throw custom error
            throw new NotFoundError();
        }
        const deleteTax = await Tax.destroy({
            where: { id }
        });
        return !!deleteTax;
    }

    async FindById(id: string): Promise<TaxOutput> {
        const tax = await Tax.findByPk(id);
        if (!tax) {
          // @todo throw custom error
            throw new NotFoundError();
        }
        return tax;
    }
}

export default TaxRepository;