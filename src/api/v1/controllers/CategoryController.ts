import { Request, Response, Router } from 'express';
import { ICategory } from '../interfaces';
import { CategoryService } from '../services';
import { getAllDataFilters } from '../dto';
import { paginate } from '../utils/paginate';
import { isAdmin, auth } from '../utils/auth';

// TODO fix this
const CategoryController = Router();
const service = new CategoryService();
CategoryController.get('/', async (req: Request, res: Response) => {

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

CategoryController.post('/', auth, isAdmin, async (req: Request, res: Response) => {
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

CategoryController.patch('/:id', auth, isAdmin, async (req: Request, res: Response) => {
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

CategoryController.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
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

CategoryController.get('/:id', async (req: Request, res: Response) => {
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

export default CategoryController;