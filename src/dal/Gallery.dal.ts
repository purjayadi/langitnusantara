import { getAllDataFilters, paginate } from '../dto'
import { GalleryInput, GalleryOutput } from '../interfaces'
import Gallery from '../models/gallery'
import { Op } from 'sequelize'

export const createGallery = async (payload: GalleryInput): Promise<GalleryOutput> => {
  const gallery = await Gallery.create(payload)
  return gallery
}

export const updateGallery = async (id: string, payload: Partial<GalleryInput>): Promise<GalleryOutput> => {
  const gallery = await Gallery.findByPk(id)
  if (!gallery) {
    // @todo throw custom error
    throw new Error('not found')
  }
  const updatedGallery = await (gallery as Gallery).update(payload)
  return updatedGallery
}

export const getGalleryById = async (id: string): Promise<GalleryOutput> => {
  const gallery = await Gallery.findByPk(id)
  if (!gallery) {
    // @todo throw custom error
    throw new Error('not found')
  }
  return gallery
}

export const deleteGalleryById = async (id: string): Promise<boolean> => {
  const deleteGallery = await Gallery.destroy({
    where: { id }
  })
  return !!deleteGallery
}

export const getAllGallery = async (
  filters?: getAllDataFilters
): Promise<paginate> => {
  const limit = filters?.limit ? +filters?.limit : 10
  const offset = filters?.page ? (+filters?.page * limit) - limit : 1
  const allGallery = Gallery.findAndCountAll({
    offset: offset,
    limit: limit
  })
  return allGallery
}