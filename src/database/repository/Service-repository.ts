import Service from '../models/service';
import { getAllDataFilters, paginate } from 'src/dto';
import { ServiceInput, ServiceOutput } from 'src/interfaces';

class ServiceRepository {
    async Service(filters?: getAllDataFilters
        ): Promise<paginate> {
            const limit = filters?.limit ? +filters?.limit : 10
            const offset = filters?.page ? (+filters?.page * limit) - limit : 1
            const allService = Service.findAndCountAll({
              offset: offset,
              limit: limit
            })
            return allService
    }

    async Create(payload: ServiceInput): Promise<ServiceOutput> {
        const service = await Service.create(payload)
        return service
    }

    async UpdateById(id: string, payload: Partial<ServiceInput>): Promise<ServiceOutput> {
        const service = await Service.findByPk(id)
        if (!service) {
            // @todo throw custom error
            throw new Error('not found')
        }
        const updatedService = await (service as Service).update(payload)
        return updatedService
    }

    async DeleteById(id: string): Promise<boolean> {
        const deleteService = await Service.destroy({
            where: { id }
        })
        return !!deleteService
    }

    async FindById(id: string): Promise<ServiceOutput> {
        const service = await Service.findByPk(id)
        if (!service) {
          // @todo throw custom error
          throw new Error('not found')
        }
        return service
    }
}

export default ServiceRepository;