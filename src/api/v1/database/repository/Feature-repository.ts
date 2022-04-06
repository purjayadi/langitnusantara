import Feature from '../models/feature';
import { getAllDataFilters, paginate } from '../../dto';
import { FeatureInput, FeatureOutput } from '../../interfaces';

class FeatureRepository {
    async Feature(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allFeature = Feature.findAndCountAll({
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
            });
            return allFeature;
    }

    async Create(payload: FeatureInput): Promise<FeatureOutput> {
        const feature = await Feature.create(payload);
        return feature;
    }

    async UpdateById(id: string, payload: Partial<FeatureInput>): Promise<FeatureOutput> {
        const feature = await Feature.findByPk(id);
        if (!feature) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedFeature = await (feature as Feature).update(payload);
        return updatedFeature;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deleteFeature = await Feature.destroy({
            where: { id }
        });
        return !!deleteFeature;
    }

    async FindById(id: string): Promise<FeatureOutput> {
        const feature = await Feature.findByPk(id);
        if (!feature) {
          // @todo throw custom error
          throw new Error('not found');
        }
        return feature;
    }
}

export default FeatureRepository;