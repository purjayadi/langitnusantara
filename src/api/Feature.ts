import { Request, Response } from 'express';
import { IFeature } from '../interfaces';
import { FeatureService } from '../services';
import { getAllDataFilters } from 'src/dto';
import { paginate } from '../utils/paginate';
import { isAdmin, auth } from '../utils/auth';

export = (app:any) => {
  const service = new FeatureService();

  app.get('/feature', async (req: Request, res: Response) => {
    const filters: getAllDataFilters = req.query;
    try {
      const data = await service.GetFeature(filters);
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

  app.post('/feature', auth, isAdmin, async (req: Request, res: Response) => {
      const feature:IFeature = req.body;
      try {
        const data = await service.CreateFeature(feature);
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

  app.patch('/feature/:id', auth, isAdmin, async (req: Request, res: Response) => {
      const feature:IFeature = req.body;
      try {
        await service.UpdateFeature(req.params.id, feature);
        return res.status(200).send({
            success: true,
            message: 'Update feature successfully'
        });
      } catch (error:any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
      }
  });

  app.delete('/feature/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        await service.DeleteFeature(req.params.id);
        return res.status(201).send({
            success: true,
            message: 'Delete feature successfully'
        });
    } catch (error:any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
  });

  app.get('/feature/:id', async (req: Request, res: Response) => {
    try {
        const data = await service.GetFeatureById(req.params.id);
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