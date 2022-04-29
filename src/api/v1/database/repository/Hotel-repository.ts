import Hotel from '../models/hotel';
import { getAllDataFilters, paginate } from '../../dto';
import { HotelInput, HotelOutput } from '../../interfaces';

class HotelRepository {
    async Hotel(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10;
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
            const allHotel = Hotel.findAndCountAll({
                ...filters?.page && { offset: offset },
                ...filters?.limit && { limit: limit },
                order: [
                    ['createdAt', 'ASC'],
                ],
            });
            return allHotel;
    }

    async Create(payload: HotelInput): Promise<HotelOutput> {
        const hotel = await Hotel.create(payload);
        return hotel;
    }

    async UpdateById(id: string, payload: Partial<HotelInput>): Promise<HotelOutput> {
        const hotel = await Hotel.findByPk(id);
        if (!hotel) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedHotel = await (hotel as Hotel).update(payload);
        return updatedHotel;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deleteHotel = await Hotel.destroy({
            where: { id }
        });
        return !!deleteHotel;
    }

    async FindById(id: string): Promise<HotelOutput> {
        const hotel = await Hotel.findByPk(id);
        if (!hotel) {
          // @todo throw custom error
          throw new Error('not found');
        }
        return hotel;
    }
}

export default HotelRepository;