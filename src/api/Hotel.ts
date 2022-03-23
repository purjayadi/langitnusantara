import { Request, Response } from 'express';
import { IHotel } from '../interfaces';
import { HotelService } from '../services';
import { getAllDataFilters } from 'src/dto';
import multer from 'multer';
import { fileFilter, fileStorage } from '../utils/multer';
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

export = (app: any) => {
  const service = new HotelService();

  app.get('/hotel', async (req: Request, res: Response) => {
    const filters: getAllDataFilters = req.query;
    try {
      const data = await service.GetHotel(filters);
      return res.status(200).send({
        success: true,
        data: data,
      });
    } catch (err: any) {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
  });

  app.post('/hotel', upload.single('banner'), async (req: Request, res: Response) => {
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

  app.patch('/hotel/:id', upload.single('banner'), async (req: Request, res: Response) => {
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

  app.delete('Hotel/:id', async (req: Request, res: Response) => {
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

  app.get('/hotel/:id', async (req: Request, res: Response) => {
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
};
