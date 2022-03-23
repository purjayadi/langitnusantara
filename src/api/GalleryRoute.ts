import { Router, Request, Response } from 'express'
import { getAllDataFilters, paginate } from 'src/dto';
import * as service from '../services';
import { IGallery } from '../interfaces';
import { getPagingData } from '../utils/pagingData'

const GalleryRouter = Router()

GalleryRouter.get('/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id)
  try {
    const result = await service.getGalleryById(id);
    return res.status(200).send({
      success: true,
      message: 'Fetch gallery successfully',
      data: result
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Fetch gallery failed'
    })
  }
})

GalleryRouter.patch('/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id)
  const payload: IGallery = req.body
  try {
    const result = await service.updateGallery(id, payload);
    return res.status(201).send({
      success: true,
      message: 'Update gallery successfully',
      data: result
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Update gallery failed'
    })
  }
})

GalleryRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id)
  try {
    const result = await service.deleteGalleryById(id);
    return res.status(204).send({
      success: true,
      message: result
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Delete gallery failed'
    })
  }
})

GalleryRouter.post('/', async (req: Request, res: Response) => {
  const payload: IGallery = req.body
  try {
    const results = await service.createGallery(payload);
    return res.status(200).send({
      success: true,
      message: 'Adding gallery successfully',
      data: results
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Adding gallery failed'
    })
  }
})

GalleryRouter.get('/', async (req: Request, res: Response) => {
  const filters: getAllDataFilters = req.query
  try {
    const data = await service.getAllGallery(filters);
    const results = getPagingData(data, filters?.page, filters?.limit)
    return res.status(200).send({
      success: true,
      message: 'Fetch gallery successfully',
      data: results
    })
  } catch (err:any) {
    return res.status(500).send({
      success: false,
      message: err.message
    })
  }
})

export default GalleryRouter
