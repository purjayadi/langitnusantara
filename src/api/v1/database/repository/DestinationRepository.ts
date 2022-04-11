import Destination from '../models/destination';
import { getAllDataFilters, paginate } from '../../dto';
import { DestinationInput, DestinationOutput } from '../../interfaces';
import { NotFoundError } from '../../utils/not-found-error';

class DestinationRepository {
    async Destination(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allDestination = Destination.scope('packages').findAndCountAll({
                distinct: true,
                col: 'Destination.id',
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
            throw new NotFoundError();
        }
        return destination;
    }

    async FindBySlug(slug: string): Promise<DestinationOutput> {
        console.log(slug);
        
        const destination = await Destination.scope('packagesAllAttributes').findOne({
            attributes: ['name', 'banner'],
            where: { slug: slug }
        });
        if (!destination) {
            // @todo throw custom error
            throw new NotFoundError();
        }
        return destination;
    }
}

export default DestinationRepository;