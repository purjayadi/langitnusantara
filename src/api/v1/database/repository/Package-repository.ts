import Package from '../models/package';
import { getAllDataFilters, paginate } from '../../dto';
import { PackageInput } from '../../interfaces';
import PackageService from '../models/packageService';
import Itinerary from '../models/itinerary';
import PackagePrice from '../models/packagePrice';
import Logger from '../../utils/logger';
import Destination from '../models/destination';

class PackageRepository {
    async Package(filters?: getAllDataFilters
    ): Promise<paginate> {
        const limit = filters?.limit ? +filters?.limit : 10;
        const offset = filters?.page ? (+filters?.page * limit) - limit : 1;
        const allPackage = Package.scope(['category', 'services', 'itinerary', 'price', 'reviews']).findAndCountAll({
            attributes: ['id', 'name', 'slug', 'description', 'noOfDay', 'isFeatured', 'banner'],
            order: [
                ['packageServices', 'type', 'ASC']
            ],
            include: [
                {
                    model: Destination,
                    as: 'destination',
                    attributes: ['name', 'slug'],
                    required: true,
                    duplicating: false
                }
            ],
            distinct: true,
            // col: 'Package.id',
            ...filters?.page && { offset: offset },
            ...filters?.limit && { limit: limit },
            where: {
                ...(filters?.isFeatured && { isFeatured: filters?.isFeatured })
            }
        });
        return allPackage;
    }

    async Create(payload: PackageInput) {
        const res = await Package.create(payload);
        if (payload.services?.length) {
            let dataService: any[] = [];
            payload.services.map(service => {
                dataService.push({
                    packageId: res.id,
                    serviceId: service.id,
                    type: service.type,
                    description: service.description,
                });
            });
            await PackageService.bulkCreate(dataService);  
        }
        if (payload.itinerary?.length) {
            let itineraries: any[] = [];
            payload.itinerary.map(itinerary => {
                itineraries.push({
                    packageId: res.id,
                    day: itinerary.day,
                    title: itinerary.title,
                    meta: itinerary.meta,
                    description: itinerary.description,
                });
            });
            // console.log(itineraries);
            
            try {
                await Itinerary.bulkCreate(itineraries);
            } catch (error) {
                console.log(error);
            }
        }
        if (payload.price?.length) {
            let prices: any[] = [];
            payload.price.map(price => {
                prices.push({
                    packageId: res.id,
                    description: price.description,
                    price: price.price
                });
            });
            
            try {
                await PackagePrice.bulkCreate(prices);
            } catch (error) {
                Logger.debug(error);
            }
        }
        return res;
    }

    async UpdateById(id: string, payload: Partial<PackageInput>) {
        const res = await Package.findByPk(id);
        if (!res) {
            // @todo throw custom error
            throw new Error('not found');
        }
        const updatedPackage = await (res as Package).update(payload);
        if (payload.services?.length) {
            await PackageService.destroy({
                where: {
                    packageId: updatedPackage.id
                }
            });
            let dataService: any[] = [];
            payload.services.map(service => {
                dataService.push({
                    packageId: res.id,
                    serviceId: service.id,
                    type: service.type,
                    description: service.description,
                });
            });
            await PackageService.bulkCreate(dataService);
        }
        if (payload.itinerary?.length) {
            await Itinerary.destroy({
                where: {
                    packageId: updatedPackage.id
                }
            });
            let itineraries: any[] = [];
            payload.itinerary.map(itinerary => {
                itineraries.push({
                    packageId: res.id,
                    day: itinerary.day,
                    title: itinerary.title,
                    meta: itinerary.meta,
                    description: itinerary.description,
                });
            });
            // console.log(itineraries);
            
            try {
                await Itinerary.bulkCreate(itineraries);
            } catch (error) {
                console.log(error);
            }
        }
        if (payload.price?.length) {
            await PackagePrice.destroy({
                where: {
                    packageId: updatedPackage.id
                }
            });
            let prices: any[] = [];
            payload.price.map(price => {
                prices.push({
                    packageId: res.id,
                    min: price.min,
                    max: price.max,
                    description: price.description,
                    price: price.price
                });
            });
            
            try {
                await PackagePrice.bulkCreate(prices);
            } catch (error) {
                Logger.debug(error);
            }
        }
        return updatedPackage;
    }

    async DeleteById(id: string): Promise<boolean> {
        const deletePackage = await Package.destroy({
            where: { id }
        });
        return !!deletePackage;
    }

    async FindById(id: string) {
        const res = await Package.scope(['category', 'services', 'itinerary', 'price', 'reviews']).findOne({
            where: { id: id },
            attributes: ['id', 'name', 'slug', 'description', 'noOfDay', 'isFeatured', 'banner']
        });
        if (!res) {
            // @todo throw custom error
            throw new Error('not found');
        }
        return res;
    }

    async FindBySlug(slug: string) {
        const res = await Package.scope(['category', 'services', 'itinerary', 'price', 'reviews']).findOne({
            where: { slug: slug },
            attributes: ['id', 'name', 'slug', 'description', 'noOfDay', 'isFeatured', 'banner'],
            include: [
                {
                    model: Destination,
                    as: 'destination',
                    attributes: ['name', 'slug'],
                    required: true,
                    duplicating: false
                }
            ],
        });
        if (!res) {
            // @todo throw custom error
            throw new Error('not found');
        }
        return res;
    }

    async FindPrice(id: string, value: number) {
        const res = await PackagePrice.findAll({
            where: { packageId: id }
        });
        if (!res) {
            // @todo throw custom error
            throw new Error('not found');
        }

        //make range between min and max
        let range;
        for (let i = res[0].min; i <= res[res.length - 1].max; i++) {
            res.map(price => {
                if (value >= price.min && i <= price.max) {
                    range = price;
                }
            });
        }
        return range;
    }
}


export default PackageRepository;