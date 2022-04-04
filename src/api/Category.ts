import { Request, Response, Router } from 'express';
import { ICategory } from '../interfaces';
import { CategoryService } from '../services';
import { getAllDataFilters } from 'src/dto';
import { paginate } from '../utils/paginate';
import { isAdmin, auth } from '../utils/auth';

// TODO fix this
const CategoryApi = Router();
const service = new CategoryService();
CategoryApi.get('/', async (req: Request, res: Response) => {

  const filters: getAllDataFilters = req.query;
  try {
    const data = await service.GetCategory(filters);
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

CategoryApi.post('/', auth, isAdmin, async (req: Request, res: Response) => {
  const category: ICategory = req.body;
  try {
    const data = await service.CreateCategory(category);
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

CategoryApi.patch('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  const category: ICategory = req.body;
  try {
    await service.UpdateCategory(req.params.id, category);
    return res.status(200).send({
      success: true,
      message: 'Update category successfully'
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

CategoryApi.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  try {
    await service.DeleteCategory(req.params.id);
    return res.status(201).send({
      success: true,
      message: 'Delete category successfully'
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

CategoryApi.get('/:id', async (req: Request, res: Response) => {
  try {
    const data = await service.GetCategoryById(req.params.id);
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

export default CategoryApi;