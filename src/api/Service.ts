import { Request, Response, Router } from 'express';
import { IService } from '../interfaces';
import { OurService } from '../services';
import { getAllDataFilters } from 'src/dto';
import { paginate } from '../utils/paginate';
import { auth, isAdmin } from '../utils/auth';

const ServiceApi = Router();
  const service = new OurService();

  ServiceApi.get('', async (req: Request, res: Response) => {
    const filters: getAllDataFilters = req.query;
    try {
      const data = await service.GetService(filters);
      const results = paginate(data, filters?.page, filters?.limit);
      return res.status(200).send({
        success: true,
        data: results
      });
    } catch (err:any) {
      return res.status(500).send({
        success: false,
        message: err.message
      });
    }
  });

  ServiceApi.post('', auth, isAdmin, async (req: Request, res: Response) => {
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

  ServiceApi.patch('/:id', auth, isAdmin, async (req: Request, res: Response) => {
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

  ServiceApi.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
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

  ServiceApi.get('/:id', auth, isAdmin, async (req: Request, res: Response) => {
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

export default ServiceApi;