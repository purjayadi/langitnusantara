import { Router, Request, Response } from 'express'
import { getAllDataFilters, paginate } from 'src/dto';
import * as service from '../services';
import { IService } from '../interfaces';
import { getPagingData } from '../utils/pagingData'

const ServiceRouter = Router()

ServiceRouter.get('/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id)
  try {
    const result = await service.getServiceById(id);
    return res.status(200).send({
      success: true,
      message: 'Fetch service successfully',
      data: result
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Fetch service failed'
    })
  }
})

ServiceRouter.patch('/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id)
  const payload: IService = req.body
  try {
    const result = await service.updateService(id, payload);
    return res.status(201).send({
      success: true,
      message: 'Update service successfully',
      data: result
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Update service failed'
    })
  }
})

ServiceRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id)
  try {
    const result = await service.deleteServiceById(id);
    return res.status(204).send({
      success: true,
      message: result
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Delete service failed'
    })
  }
})

ServiceRouter.post('/', async (req: Request, res: Response) => {
  const payload: IService = req.body
  try {
    const results = await service.createService(payload);
    return res.status(200).send({
      success: true,
      message: 'Adding service successfully',
      data: results
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Adding service failed'
    })
  }
})

ServiceRouter.get('/', async (req: Request, res: Response) => {
  const filters: getAllDataFilters = req.query
  try {
    const data = await service.getAllService(filters);
    const results = getPagingData(data, filters?.page, filters?.limit)
    return res.status(200).send({
      success: true,
      message: 'Fetch service successfully',
      data: results
    })
  } catch (err:any) {
    return res.status(500).send({
      success: false,
      message: err.message
    })
  }
})

export default ServiceRouter
