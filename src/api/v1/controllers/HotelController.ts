import { Request, Response, Router } from 'express';
import { IHotel } from '../interfaces';
import { HotelService } from '../services';
import { getAllDataFilters } from '../dto';
import multer from 'multer';
import { fileFilter, fileStorage } from '../utils/multer';
import { paginate } from '../utils/paginate';
import { isAdmin, auth } from '../utils/auth';
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

const HotelController = Router();
const service = new HotelService();

HotelController.get('', async (req: Request, res: Response) => {
  const filters: getAllDataFilters = req.query;
  try {
    const data = await service.GetHotel(filters);
    const results = paginate(data, filters?.page, filters?.limit);
    return res.status(200).send({
      success: true,
      data: results,
    });
  } catch (err: any) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

HotelController.post('', upload.single('banner'), auth, isAdmin, async (req: Request, res: Response) => {
  const payload: IHotel = {
    name: req.body.name,
    address: req.body.address,
    description: req.body.description,
    price: req.body.price,
    isActive: req.body.isActive,
    banner: req.file?.path,
  };
  try {
    const data = await service.CreateHotel(payload);
    return res.status(200).send({
      success: true,
      data: data,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

HotelController.patch('/:id', upload.single('banner'), auth, isAdmin, async (req: Request, res: Response) => {
  const payload: IHotel = {
    name: req.body.name,
    address: req.body.address,
    description: req.body.description,
    price: req.body.price,
    isActive: req.body.isActive,
    banner: req.file?.path,
  };
  try {
    await service.UpdateHotel(req.params.id, payload);
    return res.status(200).send({
      success: true,
      message: 'Update hotel successfully',
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

HotelController.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    await service.DeleteHotel(req.params.id);
    return res.status(201).send({
      success: true,
      message: 'Delete Hotel successfully',
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

HotelController.get('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    const data = await service.GetHotelById(req.params.id);
    return res.status(200).send({
      success: true,
      data: data,
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

export default HotelController;