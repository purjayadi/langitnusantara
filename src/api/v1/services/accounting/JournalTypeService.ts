import { JournalTypeRepository } from '../../database';
import { getAllDataFilters, paginate } from '../../dto';
import { JournalTypeInput } from '../../interfaces';

class JournalTypeService {
    repository: JournalTypeRepository;

    constructor() {
        this.repository = new JournalTypeRepository();
    }

    async GetJournalType(filters: getAllDataFilters): Promise<paginate> {
        return this.repository.JournalType(filters);
    }

    async CreateJournalType(payload: JournalTypeInput) {
        return this.repository.Create(payload);
    }

    async UpdateJournalType(id: string, payload: JournalTypeInput) {
        return this.repository.UpdateById(id, payload);
    }

    async DeleteJournalType(id: string) {
        return this.repository.DeleteById(id);
    }

    async GetJournalTypeById(id: string) {
        return this.repository.FindById(id);
    }

    async GetJournalTypePayload(JournalType: any) {
        if (JournalType) {
            return JournalType;
        } else {
            return ({ error: 'No JournalType Available' });
        }
    }
}

export default JournalTypeService;