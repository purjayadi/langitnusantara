import { LedgerRepository } from '../../database';
import { getAllDataFilters, paginate } from '../../dto';

class LedgerService {
    repository: LedgerRepository;

    constructor() {
        this.repository = new LedgerRepository();
    }

    async GetLedger(filters: getAllDataFilters): Promise<paginate> {
        return this.repository.Ledger(filters);
    }
}

export default LedgerService;