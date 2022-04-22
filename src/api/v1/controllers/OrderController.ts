import { Request, Response, Router } from 'express';
import { IOrder, IUser } from '../interfaces';
import { OrderService } from '../services';
import { getAllDataFilters } from '../dto';
import { paginate } from '../utils/paginate';
import { isAdmin, auth } from '../utils/auth';
import Logger from '../utils/logger';

const OrderController = Router();
const service = new OrderService();

OrderController.get('/', auth, async (req: Request, res: Response) => {
  const filters: getAllDataFilters = req.query;
  // @ts-ignore
  const user: IUser = req.user;
  Logger.debug(req.user);
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

OrderController.post('/', auth, async (req: Request, res: Response) => {
  const payload: IOrder = req.body;
  try {
    if (!payload.payment) {
      return res.status(400).json({
        success: false,
        message: 'Silahkan pilih metode pembayaran',
      });
    }
    const data = await service.CreateOrder(payload);
    if (data) {
      return res.status(200).send({
        success: true,
        message: 'Booking created successfully',
        data: data
      });
    }
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

OrderController.patch('/:id', auth, isAdmin, async (req: Request, res: Response) => {
  const payload: IOrder = req.body;
  try {
    await service.UpdateOrder(req.params.id, payload);
    return res.status(200).send({
      success: true,
      message: 'Update booking successfully',
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

OrderController.delete('/:id', auth, async (req: Request, res: Response) => {
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

OrderController.get('/:id', auth, async (req: Request, res: Response) => {
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

OrderController.patch('/:id/cancel', auth, async (req: Request, res: Response) => {
  try {
    await service.CancelOrderById(req.params.id);
    return res.status(200).send({
      success: true,
      message: 'Cancel order successfully',
    });
  } catch (error: any) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

export default OrderController;
