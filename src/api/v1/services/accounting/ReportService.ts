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

    async GetBalanceSheet(){
        return this.repository.BalanceSheet();
    }
}

export default ReportService;