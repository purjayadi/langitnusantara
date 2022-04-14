import JournalType from '../../models/accounting/journalType';
import { getAllDataFilters, paginate } from '../../../dto';
import { JournalTypeInput, JournalTypeOutput } from '../../../interfaces';

// make class repository journal type
class JournalTypeRepository {
    // get all journal type
    async JournalType(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allJournalType = JournalType.findAndCountAll({
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
                where: {
                    ...(filters?.isActive && { isActive: filters?.isActive })
                }
            });
            return allJournalType;
    }

    // create journal type
    async Create(payload: JournalTypeInput): Promise<JournalTypeOutput> {
        const journalType = await JournalType.create(payload);
        return journalType;
    }

    // update journal type by ID
    async UpdateById(id: string, payload: Partial<JournalTypeInput>): Promise<JournalTypeOutput> {
        const journalType = await JournalType.findByPk(id);
        if (!journalType) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedJournalType = await (journalType as JournalType).update(payload);
        return updatedJournalType;
    }

    // delete journal type by ID
    async DeleteById(id: string): Promise<boolean> {
        const deleteJournalType = await JournalType.destroy({
            where: { id }
        });
        return !!deleteJournalType;
    }

    // find journal type by id
    async FindById(id: string): Promise<JournalTypeOutput> {
        const journalType = await JournalType.findByPk(id);
        if (!journalType) {
          // @todo throw custom error
            throw new Error('not found');
        }
        return journalType;
    }
}

export default JournalTypeRepository;