import { Request, Response, Router } from 'express';
import { IReview } from '../interfaces';
import { ReviewService } from '../services';
import { getAllDataFilters } from '../dto';
import { paginate } from '../utils/paginate';
import { auth, isAdmin } from '../utils/auth';

const ReviewApi = Router();
const service = new ReviewService();

ReviewApi.get('', async (req: Request, res: Response) => {
  const filters: getAllDataFilters = req.query;
  try {
    const data = await service.Review(filters);
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

ReviewApi.post('', async (req: Request, res: Response) => {
  const payload: IReview = req.body;
  try {
    const data = await service.CreateReview(payload);
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

ReviewApi.patch('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  const payload: IReview = req.body;
  try {
    await service.UpdateReview(req.params.id, payload);
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

ReviewApi.delete('/:id', async (req: Request, res: Response) => {
  try {
    await service.DeleteReview(req.params.id);
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

ReviewApi.get('/:id', async (req: Request, res: Response) => {
  try {
    const data = await service.GetReviewById(req.params.id);
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

export default ReviewApi;