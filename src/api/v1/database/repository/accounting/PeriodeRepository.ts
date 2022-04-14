import Periode from '../../models/accounting/periode';
import { getAllDataFilters, paginate } from '../../../dto';
import { PeriodeInput, PeriodeOutput } from '../../../interfaces';
import { isExist } from '../../../utils/activePeriode';

class PeriodeRepository {
    async Periode(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allPeriode = Periode.findAndCountAll({
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
                where: {
                    ...(filters?.isActive && { isActive: filters?.isActive })
                }
            });
            return allPeriode;
    }

    async Create(payload: PeriodeInput): Promise<PeriodeOutput> {
        const exists = await isExist(payload.isActive);
        if (exists.length > 0) {
            throw new Error('Periode is already exist, close other periode first');
        }
        const periode = await Periode.create(payload);
        return periode;
    }

    async UpdateById(id: string, payload: PeriodeInput): Promise<PeriodeOutput> {
        const periode = await Periode.findByPk(id);
        if (!periode) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const exists = await isExist(payload.isActive);
        if (exists.length > 0) {
            throw new Error('Periode is already exist, close other periode first');
        }
        const updatedPeriode = await (periode as Periode).update(payload);
        return updatedPeriode;
    }

    async DeleteById(id: string): Promise<boolean> {
        const periode = await Periode.findByPk(id);
        if (periode?.isActive) {
            throw new Error('Can`t delete periode while periode is active');
        }
        const deletePeriode = await Periode.destroy({
            where: { id }
        });
        return !!deletePeriode;
    }

    async FindById(id: string): Promise<PeriodeOutput> {
        const periode = await Periode.findByPk(id);
        if (!periode) {
          // @todo throw custom error
            throw new Error('not found');
        }
        return periode;
    }
}

export default PeriodeRepository;