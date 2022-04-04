import Destination from '../models/destination';
import { getAllDataFilters, paginate } from 'src/dto';
import { DestinationInput, DestinationOutput } from 'src/interfaces';

class DestinationRepository {
    async Destination(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allDestination = Destination.findAndCountAll({
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
                where: {
                    ...(filters?.isFeatured && { isFeatured: filters?.isFeatured })
                }
            });
            return allDestination;
    }

    async Create(payload: DestinationInput): Promise<DestinationOutput> {
        const destination = await Destination.create(payload);
        return destination;
    }

    async UpdateById(id: string, payload: Partial<DestinationInput>): Promise<DestinationOutput> {
        const destination = await Destination.findByPk(id);
        if (!destination) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedDestination = await (destination as Destination).update(payload);
        return updatedDestination;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deleteDestination = await Destination.destroy({
            where: { id }
        });
        return !!deleteDestination;
    }

    async FindById(id: string): Promise<DestinationOutput> {
        const destination = await Destination.findByPk(id);
        if (!destination) {
          // @todo throw custom error
            throw new Error('not found');
        }
        return destination;
    }
}

export default DestinationRepository;