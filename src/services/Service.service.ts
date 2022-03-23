import * as ServiceDall from '../dal/Service.dal'
import { getAllDataFilters, paginate } from '../dto'
import { ServiceInput, ServiceOutput } from '../interfaces'

export const createService = (payload:ServiceInput): Promise<ServiceOutput> => {
  return ServiceDall.createService(payload)
}
export const updateService = (id: string, payload: Partial<ServiceInput>): Promise<ServiceOutput> => {
  return ServiceDall.updateService(id, payload)
}
export const getServiceById = (id: string): Promise<ServiceOutput> => {
  return ServiceDall.getServiceById(id)
}
export const deleteServiceById = (id: string): Promise<boolean> => {
  return ServiceDall.deleteServiceById(id)
}

export const getAllService = (filters: getAllDataFilters): Promise<paginate> => {
  return ServiceDall.getAllService(filters)
}