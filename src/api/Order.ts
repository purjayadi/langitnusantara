import { Request, Response } from 'express';
import { IOrder, IUser } from '../interfaces';
import { OrderService, VaService } from '../services';
import { getAllDataFilters } from 'src/dto';
import { paginate } from '../utils/paginate';
import { isAdmin, auth } from '../utils/auth';
import { isXendit } from '../middleware/xendit.middleware';
import Logger from '../utils/logger';

export = (app: any) => {
  const service = new OrderService();
  // eslint-disable-next-line no-unused-vars
  const va = new VaService();

  app.get('/order', auth, async (req: Request, res: Response) => {
    const filters: getAllDataFilters = req.query;
    // @ts-ignore
    const user: IUser = req.user;
    Logger.debug(req);
    try {
      const data = await service.Order(filters, user);
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

  app.post('/order', auth, async (req: Request, res: Response) => {
    const payload: IOrder = req.body;
    try {
      const data = await service.CreateOrder(payload);
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

  app.patch('/order/:id', auth, isAdmin, async (req: Request, res: Response) => {
    const payload: IOrder = req.body;
    try {
      await service.UpdateOrder(req.params.id, payload);
      return res.status(200).send({
        success: true,
        message: 'Update order successfully',
      });
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  });

  // Update status order
  app.patch('/order/status/:id', isXendit, async (req: Request, res: Response) => {
    const status = 'Paid';
    try {
      await service.UpdateStatusOrder(req.body.external_id, status);
      return res.status(200).send({
        success: true,
        message: 'Update status order successfully',
      });
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  });

  app.delete('/order/:id', auth, async (req: Request, res: Response) => {
    try {
      await service.DeleteOrder(req.params.id);
      return res.status(201).send({
        success: true,
        message: 'Delete order successfully',
      });
    } catch (error: any) {
      return res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  });

  app.get('/order/:id', auth, async (req: Request, res: Response) => {
    try {
      const data = await service.GetOrderById(req.params.id);
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
};
