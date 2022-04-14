import { PeriodeRepository } from '../../database';
import { getAllDataFilters, paginate } from '../../dto';
import { PeriodeInput } from '../../interfaces';

class PeriodeService {
    repository: PeriodeRepository;

    constructor() {
        this.repository = new PeriodeRepository();
    }

    async GetPeriode(filters: getAllDataFilters): Promise<paginate> {
        return this.repository.Periode(filters);
    }

    async CreatePeriode(payload: PeriodeInput) {
        return this.repository.Create(payload);
    }

    async UpdatePeriode(id: string, payload: PeriodeInput) {
        return this.repository.UpdateById(id, payload);
    }

    async DeletePeriode(id: string) {
        return this.repository.DeleteById(id);
    }

    async GetPeriodeById(id: string) {
        return this.repository.FindById(id);
    }

    async GetPeriodePayload(Periode: any) {
        if (Periode) {
            return Periode;
        } else {
            return ({ error: 'No Periode Available' });
        }
    }
}

export default PeriodeService;