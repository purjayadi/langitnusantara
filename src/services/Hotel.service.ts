import * as HotelDall from '../dal/Hotel.dal'
import { getAllDataFilters, paginate } from '../dto'
import { HotelInput, HotelOutput } from '../interfaces'

export const createHotel = (payload:HotelInput): Promise<HotelOutput> => {
  return HotelDall.createHotel(payload)
}
export const updateHotel = (id: string, payload: Partial<HotelInput>): Promise<HotelOutput> => {
  return HotelDall.updateHotel(id, payload)
}
export const getHotelById = (id: string): Promise<HotelOutput> => {
  return HotelDall.getHotelById(id)
}
export const deleteHotelById = (id: string): Promise<boolean> => {
  return HotelDall.deleteHotelById(id)
}

export const getAllHotel = (filters: getAllDataFilters): Promise<paginate> => {
  return HotelDall.getAllHotel(filters)
}