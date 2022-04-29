import { ReportRepository } from '../../database';
import { getAllDataFilters } from '../../dto';

class ReportService {
    repository: ReportRepository;

    constructor() {
        this.repository = new ReportRepository();
    }

    async GetTrialBalance(filters: getAllDataFilters) {
        return this.repository.TrialBalance(filters);
    }

    async GetBalanceSheet(filters: getAllDataFilters){
        return this.repository.BalanceSheet(filters);
    }
}

export default ReportService;