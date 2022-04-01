import { Request, Response } from 'express';
import { IUser } from '../interfaces';
import { UserService } from '../services';
import { getAllDataFilters } from 'src/dto';
import { paginate } from '../utils/paginate';
import { isAdmin, auth } from '../utils/auth';

export = (app:any) => {
  const service = new UserService();

  app.get('/user', auth, isAdmin, async (req: Request, res: Response) => {
    const filters: getAllDataFilters = req.query;
    try {
      const data = await service.GetUser(filters);
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

  app.post('/user', auth, isAdmin, async (req: Request, res: Response) => {
      const User:IUser = req.body;
      try {
        const data = await service.CreateUser(User);
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

  app.patch('/user/:id', auth, isAdmin, async (req: Request, res: Response) => {
      const User:IUser = req.body;
      try {
        await service.UpdateUser(req.params.id, User);
        return res.status(200).send({
            success: true,
            message: 'Update User successfully'
        });
      } catch (error:any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
      }
  });

  app.delete('/user/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        await service.DeleteUser(req.params.id);
        return res.status(201).send({
            success: true,
            message: 'Delete User successfully'
        });
    } catch (error:any) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
  });

  app.get('/user/:id', auth, isAdmin, async (req: Request, res: Response) => {
    try {
        const data = await service.GetUserById(req.params.id);
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