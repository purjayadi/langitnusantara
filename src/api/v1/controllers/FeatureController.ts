import { Request, Response, Router } from 'express';
import { IFeature } from '../interfaces';
import { FeatureService } from '../services';
import { getAllDataFilters } from '../dto';
import { paginate } from '../utils/paginate';
import { isAdmin, auth } from '../utils/auth';

const FeatureController = Router();
const service = new FeatureService();

FeatureController.get('/', async (req: Request, res: Response) => {
  const filters: getAllDataFilters = req.query;
  try {
    const data = await service.GetFeature(filters);
    const results = paginate(data, filters?.page, filters?.limit);
    return res.status(200).send({
      success: true,
      data: results
    });
  } catch (err: any) {
    return res.status(500).send({
      success: false,
      message: err.message
    });
  }
});

FeatureController.post('/', auth, isAdmin, async (req: Request, res: Response) => {
  const feature: IFeature = req.body;
  try {
    const data = await service.CreateFeature(feature);
    return res.status(200).send({
      success: true,
      data: data
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

FeatureController.patch('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  const feature: IFeature = req.body;
  try {
    await service.UpdateFeature(req.params.id, feature);
    return res.status(200).send({
      success: true,
      message: 'Update feature successfully'
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

FeatureController.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    await service.DeleteFeature(req.params.id);
    return res.status(201).send({
      success: true,
      message: 'Delete feature successfully'
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

FeatureController.get('/:id', async (req: Request, res: Response) => {
  try {
    const data = await service.GetFeatureById(req.params.id);
    return res.status(200).send({
      success: true,
      data: data
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

export default FeatureController;