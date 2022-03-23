import { Request, Response } from 'express';
import { IService } from '../interfaces';
import { OurService } from '../services';
import { getAllDataFilters } from 'src/dto';

export = (app:any) => {
  const service = new OurService();

  app.get('/service', async (req: Request, res: Response) => {
    const filters: getAllDataFilters = req.query
    try {
      const data = await service.GetService(filters);
      return res.status(200).send({
        success: true,
        data: data
      });
    } catch (err:any) {
      return res.status(500).send({
        success: false,
        message: err.message
      });
    }
  });

  app.post('/service', async (req: Request, res: Response) => {
      const payload:IService = req.body;
      try {
        const data = await service.CreateService(payload);
        return res.status(200).send({
            success: true,
            data: data
        });
      } catch (error:any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
      }
  });

  app.patch('/service/:id', async (req: Request, res: Response) => {
      const payload:IService = req.body;
      try {
        await service.UpdateService(req.params.id, payload);
        return res.status(200).send({
            success: true,
            message: 'Update service successfully'
        });
      } catch (error:any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
      }
  });

  app.delete('service/:id', async (req: Request, res: Response) => {
    try {
        await service.DeleteService(req.params.id);
        return res.status(201).send({
            success: true,
            message: 'Delete service successfully'
        });
    } catch (error:any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
  });

  app.get('/service/:id', async (req: Request, res: Response) => {
    try {
        const data = await service.GetServiceById(req.params.id);
        return res.status(200).send({
            success: true,
            data: data
        });
    } catch (error:any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
  });
}