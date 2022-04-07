import { Request, Response, Router } from 'express';
import { IOrder, IUser } from '../interfaces';
import { OrderService, paymentEvent, VaService } from '../services';
import { getAllDataFilters } from '../dto';
import { paginate } from '../utils/paginate';
import { isAdmin, auth } from '../utils/auth';
import { isXendit } from '../middleware/xendit.middleware';
import Logger from '../utils/logger';

const OrderApi = Router();
const service = new OrderService();
const event = new paymentEvent();
// eslint-disable-next-line no-unused-vars
const va = new VaService();

OrderApi.get('', auth, async (req: Request, res: Response) => {
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

OrderApi.post('', auth, async (req: Request, res: Response) => {
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
      const makePayment = await event.MakePayment(payload.payment, data);
      return res.status(200).send({
        success: true,
        message: 'Booking created successfully',
        data: makePayment,
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

OrderApi.patch('/:id', auth, isAdmin, async (req: Request, res: Response) => {
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

// Update status order
OrderApi.patch('/status/:id', isXendit, async (req: Request, res: Response) => {
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

OrderApi.delete('/:id', auth, async (req: Request, res: Response) => {
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

OrderApi.get('/:id', auth, async (req: Request, res: Response) => {
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

OrderApi.get('/payment/detail/:id', auth, async (req: Request, res: Response) => {
  try {
    const payment = await va.GetVaById(req.params.id);
    payment && res.status(200).send({
      success: true,
      data: payment
    });
    return res.status(404).send({
      success: false,
      message: 'payment not found'
    });
  } catch (error:any) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

OrderApi.get('/payment/status/:id', auth, async (req: Request, res: Response) => {
  try {
    const payment = await va.GetVaById(req.params.id);
    payment && res.status(200).send({
      success: true,
      data: payment
    });
    return res.status(404).send({
      success: false,
      message: 'payment not found'
    });
  } catch (error:any) {
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

export default OrderApi;
