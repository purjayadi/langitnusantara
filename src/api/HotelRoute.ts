import { Router, Request, Response } from 'express'
import { getAllDataFilters, paginate } from 'src/dto';
import * as service from '../services';
import { IHotel } from '../interfaces';
import { getPagingData } from '../utils/pagingData'
import multer from 'multer';
import { fileFilter, fileStorage } from '../utils/multer';

const HotelRouter = Router()
const upload = multer({storage: fileStorage, fileFilter : fileFilter});

HotelRouter.get('/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id)
  try {
    const result = await service.getHotelById(id);
    return res.status(200).send({
      success: true,
      message: 'Fetch hotel successfully',
      data: result
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Fetch hotel failed'
    })
  }
})

HotelRouter.patch('/:id', upload.single('banner'), async (req: Request, res: Response) => {
  const id = String(req.params.id)
  const payload: IHotel = {
    name: req.body.name,
    address: req.body.address,
    description: req.body.description,
    price: req.body.price,
    isActive: req.body.isActive,
    banner: req.file?.path
  }
  try {
    const result = await service.updateHotel(id, payload);
    return res.status(201).send({
      success: true,
      message: 'Update Hotel successfully',
      data: result
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Update Hotel failed'
    })
  }
})

HotelRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id)
  try {
    const result = await service.deleteHotelById(id);
    return res.status(204).send({
      success: true,
      message: result
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Delete Hotel failed'
    })
  }
})

HotelRouter.post('/', upload.single('banner'), async (req: Request, res: Response) => {
  const payload: IHotel = {
    name: req.body.name,
    address: req.body.address,
    description: req.body.description,
    price: req.body.price,
    isActive: req.body.isActive,
    banner: req.file?.path
  }
  
  try {
    const results = await service.createHotel(payload);
    return res.status(200).send({
      success: true,
      message: 'Adding Hotel successfully',
      data: results
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Adding Hotel failed'
    })
  }
})

HotelRouter.get('/', async (req: Request, res: Response) => {
  const filters: getAllDataFilters = req.query
  try {
    const data = await service.getAllHotel(filters);
    const results = getPagingData(data, filters?.page, filters?.limit)
    return res.status(200).send({
      success: true,
      message: 'Fetch hotel successfully',
      data: results
    })
  } catch (err:any) {
    return res.status(500).send({
      success: false,
      message: err.message
    })
  }
})

export default HotelRouter
