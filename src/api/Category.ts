import { Request, Response } from 'express';
import { ICategory } from '../interfaces';
import { CategoryService } from '../services';
import { getAllDataFilters } from 'src/dto';
import { paginate } from '../utils/paginate';
import { isAdmin, auth } from '../utils/auth';

// TODO fix this
export = (app:any) => {
  const service = new CategoryService();

  app.get('/category', async (req: Request, res: Response) => {
    
    const filters: getAllDataFilters = req.query;
    try {
      const data = await service.GetCategory(filters);
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

  app.post('/category', auth, isAdmin, async (req: Request, res: Response) => {
      const category:ICategory = req.body;
      try {
        const data = await service.CreateCategory(category);
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

  app.patch('/category/:id', auth, isAdmin, async (req: Request, res: Response) => {
      const category:ICategory = req.body;
      try {
        await service.UpdateCategory(req.params.id, category);
        return res.status(200).send({
            success: true,
            message: 'Update category successfully'
        });
      } catch (error:any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
      }
  });

  app.delete('/category/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        await service.DeleteCategory(req.params.id);
        return res.status(201).send({
            success: true,
            message: 'Delete category successfully'
        });
    } catch (error:any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
  });

  app.get('/category/:id', async (req: Request, res: Response) => {
    try {
        const data = await service.GetCategoryById(req.params.id);
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