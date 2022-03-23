import * as GalleryDall from '../dal/Gallery.dal'
import { getAllDataFilters, paginate } from '../dto'
import { GalleryInput, GalleryOutput } from '../interfaces'

export const createGallery = (payload:GalleryInput): Promise<GalleryOutput> => {
  return GalleryDall.createGallery(payload)
}
export const updateGallery = (id: string, payload: Partial<GalleryInput>): Promise<GalleryOutput> => {
  return GalleryDall.updateGallery(id, payload)
}
export const getGalleryById = (id: string): Promise<GalleryOutput> => {
  return GalleryDall.getGalleryById(id)
}
export const deleteGalleryById = (id: string): Promise<boolean> => {
  return GalleryDall.deleteGalleryById(id)
}

export const getAllGallery = (filters: getAllDataFilters): Promise<paginate> => {
  return GalleryDall.getAllGallery(filters)
}