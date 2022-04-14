import { BeginningBalanceRepository } from '../../database';
import { getAllDataFilters, paginate } from '../../dto';
import { BeginningBalanceInput } from '../../interfaces';

class BeginningBalanceService {
    repository: BeginningBalanceRepository;

    constructor() {
        this.repository = new BeginningBalanceRepository();
    }

    async GetBeginningBalance(filters: getAllDataFilters): Promise<paginate> {
        return this.repository.BeginningBalance(filters);
    }

    async CreateBeginningBalance(payload: BeginningBalanceInput) {
        return this.repository.Create(payload);
    }

    async UpdateBeginningBalance(id: string, payload: BeginningBalanceInput) {
        return this.repository.UpdateById(id, payload);
    }

    async DeleteBeginningBalance(id: string) {
        return this.repository.DeleteById(id);
    }

    async GetBeginningBalanceById(id: string) {
        return this.repository.FindById(id);
    }

    async GetBeginningBalancePayload(BeginningBalance: any) {
        if (BeginningBalance) {
            return BeginningBalance;
        } else {
            return ({ error: 'No BeginningBalance Available' });
        }
    }
}

export default BeginningBalanceService;