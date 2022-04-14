import { JournalRepository } from '../../database';
import { getAllDataFilters, paginate } from '../../dto';
import { JournalInput } from '../../interfaces';

class JournalService {
    repository: JournalRepository;

    constructor() {
        this.repository = new JournalRepository();
    }

    async GetJournal(filters: getAllDataFilters): Promise<paginate> {
        return this.repository.Journal(filters);
    }

    async CreateJournal(payload: JournalInput) {
        return this.repository.Create(payload);
    }

    async UpdateJournal(code: string, payload: JournalInput) {
        return this.repository.Update(code, payload);
    }

    async DeleteJournal(id: string) {
        return this.repository.DeleteById(id);
    }

    async GetJournalById(id: string) {
        return this.repository.FindById(id);
    }

    async GetJournalByCode(code: string) {
        return this.repository.findByCode(code);
    }

    async GetJournalPayload(Journal: any) {
        if (Journal) {
            return Journal;
        } else {
            return ({ error: 'No Journal Available' });
        }
    }
}

export default JournalService;