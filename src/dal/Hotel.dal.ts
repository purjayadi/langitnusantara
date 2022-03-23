import { getAllDataFilters, paginate } from '../dto'
import { HotelInput, HotelOutput } from '../interfaces'
import Hotel from '../models/hotel'
import { Op } from 'sequelize'
import multer, { FileFilterCallback } from 'multer'
type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const createHotel = async (payload: HotelInput): Promise<HotelOutput> => {
  const hotel = await Hotel.create(payload)
  return hotel
}

export const updateHotel = async (id: string, payload: Partial<HotelInput>): Promise<HotelOutput> => {
  const hotel = await Hotel.findByPk(id)
  if (!hotel) {
    // @todo throw custom error
    throw new Error('not found')
  }
  const updatedHotel = await (hotel as Hotel).update(payload)
  return updatedHotel
}

export const getHotelById = async (id: string): Promise<HotelOutput> => {
  const hotel = await Hotel.findByPk(id)
  if (!hotel) {
    // @todo throw custom error
    throw new Error('not found')
  }
  return hotel
}

export const deleteHotelById = async (id: string): Promise<boolean> => {
  const deleteHotel = await Hotel.destroy({
    where: { id }
  })
  return !!deleteHotel
}

export const getAllHotel = async (
  filters?: getAllDataFilters
): Promise<paginate> => {
  const limit = filters?.limit ? +filters?.limit : 10
  const offset = filters?.page ? (+filters?.page * limit) - limit : 1
  const allHotel = Hotel.findAndCountAll({
    offset: offset,
    limit: limit
  })
  return allHotel
}