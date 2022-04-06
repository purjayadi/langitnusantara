import { getAllDataFilters, paginate } from '../../dto';
import { PartnerInput, PartnerOutput } from '../../interfaces';
import Partner from '../models/partner';

class PartnerRepository {
    async Partner(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allPartner = Partner.findAndCountAll({
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
            });
            return allPartner;
    }

    async Create(payload: PartnerInput): Promise<PartnerOutput> {
        const partner = await Partner.create(payload);
        return partner;
    }

    async UpdateById(id: string, payload: Partial<PartnerInput>): Promise<PartnerOutput> {
        const partner = await Partner.findByPk(id);
        if (!partner) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedPartner = await (partner as Partner).update(payload);
        return updatedPartner;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deletePartner = await Partner.destroy({
            where: { id }
        });
        return !!deletePartner;
    }

    async FindById(id: string): Promise<PartnerOutput> {
        const partner = await Partner.findByPk(id);
        if (!partner) {
          // @todo throw custom error
          throw new Error('not found');
        }
        return partner;
    }
}

export default PartnerRepository;