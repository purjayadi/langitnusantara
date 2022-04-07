import { Request, Response, Router } from 'express';
import { IUser } from '../interfaces';
import { UserService } from '../services';
import { getAllDataFilters } from '../dto';
import { paginate } from '../utils/paginate';
import { isAdmin, auth } from '../utils/auth';

const UserApi = Router();
  const service = new UserService();

  UserApi.get('', auth, isAdmin, async (req: Request, res: Response) => {
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

  UserApi.post('', auth, isAdmin, async (req: Request, res: Response) => {
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

  UserApi.patch('/:id', auth, isAdmin, async (req: Request, res: Response) => {
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

  UserApi.delete('/:id', auth, isAdmin, async (req: Request, res: Response) => {
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

  UserApi.get('/:id', auth, isAdmin, async (req: Request, res: Response) => {
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

export default UserApi;