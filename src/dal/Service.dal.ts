import { getAllDataFilters, paginate } from '../dto'
import { ServiceInput, ServiceOutput } from '../interfaces'
import Service from '../models/service'
import { Op } from 'sequelize'

export const createService = async (payload: ServiceInput): Promise<ServiceOutput> => {
  const service = await Service.create(payload)
  return service
}

export const updateService = async (id: string, payload: Partial<ServiceInput>): Promise<ServiceOutput> => {
  const service = await Service.findByPk(id)
  if (!service) {
    // @todo throw custom error
    throw new Error('not found')
  }
  const updatedService = await (service as Service).update(payload)
  return updatedService
}

export const getServiceById = async (id: string): Promise<ServiceOutput> => {
  const service = await Service.findByPk(id)
  if (!service) {
    // @todo throw custom error
    throw new Error('not found')
  }
  return service
}

export const deleteServiceById = async (id: string): Promise<boolean> => {
  const deleteService = await Service.destroy({
    where: { id }
  })
  return !!deleteService
}

export const getAllService = async (
  filters?: getAllDataFilters
): Promise<paginate> => {
  const limit = filters?.limit ? +filters?.limit : 10
  const offset = filters?.page ? (+filters?.page * limit) - limit : 1
  const allService = Service.findAndCountAll({
    offset: offset,
    limit: limit
  })
  return allService
}